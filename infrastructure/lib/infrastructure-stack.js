const cdk = require('aws-cdk-lib');
const s3 = require('aws-cdk-lib/aws-s3');
const cloudfront = require('aws-cdk-lib/aws-cloudfront');
const origins = require('aws-cdk-lib/aws-cloudfront-origins');
const acm = require('aws-cdk-lib/aws-certificatemanager');
const route53 = require('aws-cdk-lib/aws-route53');
const s3deploy = require('aws-cdk-lib/aws-s3-deployment');
const lambda = require('aws-cdk-lib/aws-lambda');
const apigw = require('aws-cdk-lib/aws-apigateway');
const secrets = require('aws-cdk-lib/aws-secretsmanager');
const rds = require('aws-cdk-lib/aws-rds');
const ec2 = require('aws-cdk-lib/aws-ec2');
const cloudwatch = require('aws-cdk-lib/aws-cloudwatch');
const logs = require('aws-cdk-lib/aws-logs');


class InfrastructureStack extends cdk.Stack {

  constructor(scope, id, props) {
    super(scope, id, props);

    // Front End
    const bucket = new s3.Bucket(this, 'Website Bucket', {
      bucketName: 'actsent-website-bucket',
      encryption: s3.BucketEncryption.S3_MANAGED,
      removalPolicy: cdk.RemovalPolicy.DESTROY,
      autoDeleteObjects: true,
    });


    // Database (external)    
    const dbSecret = secrets.Secret.fromSecretPartialArn(this, 'DB Secrets', `arn:aws:secretsmanager:${this.region}:${this.account}:secret:${props.dbSecret}`)

    const dbSecurityGroup = ec2.SecurityGroup.fromLookupById(this, 'DB Security Group', props.dbSecurityGroup);

    // Back End
    const vpc = ec2.Vpc.fromLookup(this, 'VPC', {
      vpcName: 'AcademySharedInfraStack/NjaSharedVpc',
    });

    const lambdaSG = new ec2.SecurityGroup(this, 'Lambda Security Group', { vpc, allowAllOutbound: false });

    lambdaSG.connections.allowTo(dbSecurityGroup, ec2.Port.tcp(5432), 'RDS Instance');

    const apiLambda = new lambda.Function(this, 'API Lambda', {
      functionName: 'ActsentLambda',
      runtime: lambda.Runtime.NODEJS_14_X,
      code: lambda.Code.fromAsset('../back-end'),
      handler: 'lambda.handler',
      environment: {
        "DB_HOSTNAME": dbSecret.secretValueFromJson('host'),
        "DB_PORT": dbSecret.secretValueFromJson('port'),
        "DB_USER": dbSecret.secretValueFromJson('username'),
        "DB_PASSWORD": dbSecret.secretValueFromJson('password'),
        "DB_NAME": dbSecret.secretValueFromJson('dbname'),
      },
      vpc,
      securityGroups: [lambdaSG],
    });

    // db.grantDataApiAccess(apiLambda);

    const apiGateway = new apigw.LambdaRestApi(this, 'API', {
      handler: apiLambda,
      defaultCorsPreflightOptions: {
        allowOrigins: apigw.Cors.ALL_ORIGINS,
        allowMethods: apigw.Cors.ALL_METHODS,
        allowHeaders: apigw.Cors.DEFAULT_HEADERS
      }
    });


    // Cloudfront Distribution
    const originAccessIdentity = new cloudfront.OriginAccessIdentity(this, 'Origin Access Identity', {
      comment: "Created by CDK"
    });

    bucket.grantRead(originAccessIdentity);

    const cert = acm.Certificate.fromCertificateArn(this, "cert", `arn:aws:acm:us-east-1:${props?.env.account}:certificate/${props?.certId}`);


    const distribution = new cloudfront.Distribution(this, 'Cloudfront', {
      defaultBehavior: {
        origin: new origins.S3Origin(bucket, { originAccessIdentity }),
        functionAssociations: [{
          eventType: cloudfront.FunctionEventType.VIEWER_REQUEST,
          function: new cloudfront.Function(this, 'Cloudfront Redirect Function', {
            code: cloudfront.FunctionCode.fromFile({ filePath: "functions/redirect.js" }),
          }),
        }]
      },
      additionalBehaviors: {
        'api/*': {
          origin: new origins.HttpOrigin(
            `${apiGateway.restApiId}.execute-api.${this.region}.${this.urlSuffix}`,
            {
              originPath: `/${apiGateway.deploymentStage.stageName}`,
            }
          ),
          allowedMethods: cloudfront.AllowedMethods.ALLOW_ALL,
          cachePolicy: cloudfront.CachePolicy.CACHING_DISABLED,
          responseHeadersPolicy: cloudfront.ResponseHeadersPolicy.CORS_ALLOW_ALL_ORIGINS
        }
      },
      priceClass: cloudfront.PriceClass.PRICE_CLASS_100,
      domainNames: [`${props?.subDomain}.${props?.domainName}`],
      certificate: cert,
    });


    // Front End Deployment
    new s3deploy.BucketDeployment(this, 'Deploy Website', {
      sources: [s3deploy.Source.asset(`../front-end/build`)],
      destinationBucket: bucket,
      distribution,
      distributionPaths: ["/*"],
    });


    // Domain Name
    const zone = route53.HostedZone.fromLookup(this, "Hosted Zone", {
      domainName: props?.domainName ?? "",
    });

    new route53.CnameRecord(this, `CNAME`, {
      zone,
      domainName: distribution.domainName,
      recordName: `${props?.subDomain}.${props?.domainName}`,
    });

    const metric = new cloudwatch.Metric({
      namespace: 'Actsent',
      metricName: 'eventCreationRequests',
      period: cdk.Duration.hours(1),
      statistic: 'sum'
    });

    const filter = new logs.MetricFilter(this, 'Metric filter', {
      metricName: 'eventCreationRequests',
      metricNamespace: 'Actsent',
      logGroup: apiLambda.logGroup,
      filterPattern: logs.FilterPattern.exists('eventsCreated'),
      metricValue: '$.eventsCreated'
    })

    // Outputs
    new cdk.CfnOutput(this, "Frontend URL Output", {
      value: `https://${props?.subDomain}.${props?.domainName}`,
    });
  }
}

module.exports = { InfrastructureStack }


// const { Stack, CfnOutput, RemovalPolicy } = require('aws-cdk-lib');
// const s3 = require('aws-cdk-lib/aws-s3');
// const iam = require('aws-cdk-lib/aws-iam');
// const s3deploy = require('aws-cdk-lib/aws-s3-deployment');



// //cde
// class InfrastructureStack extends Stack {
//   constructor(scope, id, props) {
//     super(scope, id, props);
//     const myBucket = new s3.Bucket(this, 'FileBucket', {
//       bucketName: 'actsent-website',
//       blockPublicAccess: s3.BlockPublicAccess.BLOCK_ALL,
//       encryption: s3.BucketEncryption.S3_MANAGED,
//       removalPolicy: RemovalPolicy.DESTROY,
//       websiteIndexDocument: 'index.html',
//       websiteErrorDocument: 'error.html',
//     });
//     myBucket.addToResourcePolicy(
//       new iam.PolicyStatement({
//         effect: iam.Effect.ALLOW,
//         principals: [new iam.StarPrincipal()],
//         actions: ['s3:*'],
//         resources: [
//           myBucket.bucketArn,
//           `${myBucket.bucketArn}/*`
//         ],
//         conditions: {
//           "IpAddress": {
//             "aws:SourceIp": "92.40.172.141"
//           }
//         }
//       }),
//     );
//     new s3deploy.BucketDeployment(this, 'DeployWebsite', {
//       sources: [s3deploy.Source.asset('../front-end/build')],
//       destinationBucket: myBucket,
//     });
//     new CfnOutput(this, 'WebsiteURL', {
//       value: myBucket.bucketWebsiteUrl,
//     });
//   }
// }

// module.exports = { InfrastructureStack }
