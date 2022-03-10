
import { useHistory} from "react-router-dom";

const VenueListItem = (props) =>{
    const history = useHistory()

    const singlevenue = () => {
        history.push(`/venues/${props.id}`)
    }

    return (


         <>
      

        
        <div class="cardWrapper" key={props.id}>
        <div class="card" style={{width: '18rem'}}>
          <img src={props.image} class="card-img-top roundedImage" alt="..." onerror="standby()" />
          <div class="card-body" id="cardFlex">
            <h5 class="card-title"><strong>{props.name}</strong></h5>
            <p class="card-text">{props.location} <br></br>

            
            </p>

            {/* <a href={eventURL} class="btn btn-primary">See more </a> */}
            <button id="seeMore" class="btn btn-primary" onClick ={singlevenue}>
                                View Venue
                            </button>
          </div>
        </div>
      </div>
    
      </>
        // <div key={props.id} >

        //     <div className="card mb-3" >

        //         <div className="row no-gutters">

        //             <div className="col-md-4">
        //                 <img src={props.image} className="card-img" alt="..."/>
        //             </div>

        //             <div className="col-md-8">
        //                 <div className="card-body">
        //                     <h5 className="card-title"> {props.name} </h5>

        //                     <p className="card-text"> {props.location} <br/>
        //                         {props.description}
        //                     </p>

                           

        //                 </div>

        //             </div>

        //         </div>

        //     </div>

        // </div>
    )
}

export default VenueListItem




