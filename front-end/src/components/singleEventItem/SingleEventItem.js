
const SingleEventItem = (props) =>{
    return (

        <div key={props.event.id} >

        <div className="card mb-3" >

            <div className="row no-gutters">

                <div className="col-md-4">
                    <img src={props.event.event_image} className="card-img" alt="..."/>
                </div>

                <div className="col-md-8">
                    <div className="card-body">
                        <h5 className="card-title"> {props.event.event_name} </h5>
                        <h5 className="card-title"> {props.event.status} </h5>

                        <p className="card-text">
                            {props.event.venue_geolocation}<br/>
                            {props.event.date}<br/>
                            {props.event.genre}<br/>
                            {props.event.event_description}<br/>
                        </p>

                    </div>

                </div>

            </div>

        </div>

    </div>

    )
}
    

export default SingleEventItem