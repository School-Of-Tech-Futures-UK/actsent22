import {useState} from 'react'

//const venue_id = req.body.id
    //const date = req.body.date
    //const event_name = req.body.name
    //const event_description= req.body.description
    //const event_image = req.body.image
    //const artist_name = req.body.artist_name
    //const artist_email=req.body.artist_email
    //const genre=req.body.genre
    //const status=req.body.status


const BookingForm = (props) =>{

    const [artistName, setArtistName] = useState('')
    const [eventName, setEventName] = useState('')
    const [eventDescription, setEventDescription]  = useState('')
    const [date, setDate] = useState('')
    const [artistEmail, setArtistEmail] = useState('')
    const [genre, setGenre] = useState('')
    const [status, setStatus] = useState('pending')
    const [id, setId]=useState(props.id)
    const [eventImage, setEventImage] = useState('')


  function SubmitButton(){
    if (artistName && eventName && eventDescription && date && artistEmail && genre && status && id && eventImage){
      return <input type='submit' class="btn btn-primary" value='Request a Booking' />
    } else {
      return <input type='submit' class="btn btn-primary" value='Request a Booking' disabled/>
    };
  };
 


  var today = new Date().toISOString().split('T')[0];

    const onSubmit = (e) =>{
        // TO PREVENT THE PAGE RELOAD ON SUBMIT
        e.preventDefault()

        if(!artistName){
            alert('Please add a name!')
            return
        }

        props.onBook({artistName, date, id, eventDescription, genre, artistEmail, eventName, status, eventImage})
        alert('Your request has been successfully submitted!')

        
    }

    return (
        

			<div id="eventTicketInput">
			{/* <h3>Your ticket to <strong> {eventData[0].event_name} </strong> </h3>
			<h5>{eventData[0].artist_name} at {eventData[0].venue_name}</h5> */}
		
        
        <form class="form-group" onSubmit={onSubmit}>
                    <div>
              <label>Artist Name</label>
             <input type='text'  class="form-control input-sm" placeholder="Mozart" 
                value={artistName} onChange={(e)=> {setArtistName(e.target.value)}}/>
           </div>

           <div>
               <label>Artist email</label>
               <input type='text'  class="form-control input-sm" placeholder="mozart@gmail.com" 
                value={artistEmail} onChange={(e)=> {setArtistEmail(e.target.value)}}/>
           </div>

           <div>
               <label>Event Name</label>
               <input type='text' class="form-control input-sm"  placeholder="Amadeus" 
                value={eventName} onChange={(e)=> {setEventName(e.target.value)}}/>
           </div>

           <div>
               <label>Date</label>
               <input type='date'
               value={date} min={today} class="form-control input-sm" onChange={(e)=> {setDate(e.target.value)}}/>
           </div>
           
           <div>
               <label>Event Description</label>
               <input type='text' class="form-control input-sm" placeholder="great"
               value={eventDescription}  onChange={(e)=> {setEventDescription(e.target.value)}} size='10'
               />
           </div>

           <div>
               <label for='genre' >Genre</label>
               <select id = 'genre' value={genre} class="form-control input-sm"  onChange={(e)=> {setGenre(e.target.value)}}>
                <option value="">--Please select a genre--</option>
                <option value="hiphop">Hip Hop</option>
                <option value="rock">Rock</option>
                <option value="pop">Pop</option>
                <option value="edm">EDM</option>
                <option value="country">Country</option>
                <option value="other">Other</option>
               </select>
           </div>

           <div>
               <label>Image url</label>
               <input type='text' class="form-control input-sm" placeholder=""
               value={eventImage} onChange={(e)=> {setEventImage(e.target.value)}}/>
           </div>

           <SubmitButton></SubmitButton>

						{/* <div className="message">{message ? <p>{message}</p> : null}</div> */}
					</form>
			</div>

		
	

  

       
    )


}










export default BookingForm