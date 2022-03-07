
import { useHistory} from "react-router-dom";


const VenueListItem = (props) =>{
    const history = useHistory()

    const singlevenue = () => {
        history.push(`/venues/${props.id}`)
    }

    return (
        <div key={props.id} >

            <div className="card mb-3" >

                <div className="row no-gutters">

                    <div className="col-md-4">
                        <img src={props.image} className="card-img" alt="..."/>
                    </div>

                    <div className="col-md-8">
                        <div className="card-body">
                            <h5 className="card-title"> {props.name} </h5>

                            <p className="card-text"> {props.location} <br/>
                                {props.description}
                            </p>

                            <button className='venuebutton' onClick ={singlevenue}>
                                View Venue
                            </button>

                        </div>

                    </div>

                </div>

            </div>

        </div>
    )
}

export default VenueListItem




