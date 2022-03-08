
const SingleEventItem = (props) =>{
    return (

        <div class="cardWrapper" key={props.id}>
                <div class="card" style={{width: '18rem'}}>
                  <img src={props.event.event_image} class="card-img-top roundedImage" alt="..." onerror="standby()" />
                  <div class="card-body" id="cardFlex">
                    <h2 class="card-title"><strong>{props.event.event_name}</strong></h2>
                    <p class="card-text">
                    <h5>{props.event.status}</h5> <br/>
                    {props.event.venue_address}<br/>
                    {props.event.date}<br/>
                    {props.event.genre}<br/>
                    {props.event.event_description}<br/>   
                    </p>
                  </div>
                </div>

   

    </div>

    )
}
    

export default SingleEventItem