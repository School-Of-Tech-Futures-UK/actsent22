import * as React from 'react'
import BookBtn from '../components/bookBtn/BookBtn'
import { useEffect, useState} from 'react'
import { useParams} from "react-router-dom";
import BookingForm from '../components/bookingForm/BookingForm'


async function fetchVenue(id){
    console.log("welcome to venue")
    const res = await fetch('https://venues.sotf2022-01.com/api/venue_info')
    const data = await res.json()

    // WE ONLY RETURN THE VENUE WHOSE ID MATCHES id
    console.log(data.find(venue => venue.venue_id === id))
    return data.find(venue => venue.venue_id === id)
  }


const SingleVenuePage = () =>{
    
    const [showBookingForm, setShowBookingForm] = useState(false)

    const [bookingRequest, setBookingRequest] = useState(
        {
            venueId: 1,
            artistName: "Mozart",
            date: "27 January 1756",
            capacity: 100
        }
    )

    const [venueState, setVenueState] = useState('abc')

    const {id, location} = useParams()
    
    console.log("id: ", id)
    console.log("location: ", location)

    useEffect(() => {
        // WE HAVE TO parseInt THE ID TO CONVERT IT TO AN INT
        fetchVenue(parseInt(id)).then(setVenueState)
        
    }, [])

    const toggleBookingForm = () => {
        setShowBookingForm(!showBookingForm)
    }

    //const venue_id = req.body.id
    //const venue_name = req.body.location
    //const date = req.body.date
    //const event_name = req.body.name
    //const event_description= req.body.description
    //const event_image = req.body.image
    //const artist_name = req.body.artist_name
    //const artist_email=req.body.artist_email
    //const genre=req.body.genre
    //const status=req.body.status

    async function sendBookingRequest (newBookingRequest) {
        const response = await fetch('https://events.sotf2022-01.com/api/create_event', {
          method: 'POST',
          headers: {
            'content-type': 'application/json'
          },
      
          body: JSON.stringify(newBookingRequest)
        })

        const data = response.text()
        // console.log(data)
    }
      
    const submitRequest = (newBookingRequest) =>{

        // console.log(newBookingRequest)
        // console.log(parseInt(id))
        // console.log(id)

        sendBookingRequest(newBookingRequest)
    
        setBookingRequest( 
            {
                venue_id: parseInt(id),
                artistName: newBookingRequest.artistName,
                artistEmail: newBookingRequest.artistEmail,
                date: newBookingRequest.date,
                eventName: newBookingRequest.eventName,
                eventImage: newBookingRequest.eventImage,
                genre: newBookingRequest.genre,
                status: newBookingRequest.status,
                eventDescription: newBookingRequest.eventDescription
            }
        )
        
        setShowBookingForm(!showBookingForm)
    }

    return (
        <>
            {
                venueState === undefined ? <p> please wait ..</p> : 
                <>

{/* <Link type="button" to='/' class="btn btn-primary"> ← Home</Link> */}
        <div class="eventFlex">
            <div id="eventHeader">
                <img id="eventImage" src={venueState.venue_image} class="card-img-top" alt="..." height="250px" />
                <div id="eventReview">
                    <span class="fa fa-star checked"></span>
                    <span class="fa fa-star checked"></span>
                    <span class="fa fa-star checked"></span>
                    <span class="fa fa-star"></span>
                    <span class="fa fa-star"></span>
                </div>
            
            </div>
            <div class="eventCardFlex">
                <div class="eventDetailsFlex" id="childFlex" >
                    <div class="card mainDetails">
                        <div class="card-body">
                            <h5 class="card-title"> {venueState.venue_name}</h5>
                            <p class="card-text">{venueState.venue_address} <br /></p>
                        </div>
                    </div>
            
                    <div class="eventButtonsFlex">
                        {/* <button type="button" class="btn btn-primary" id="eventButtonFlex"> Book Now </button> */}
                        <BookBtn  onClick= {toggleBookingForm} text= {showBookingForm ? "Cancel Request" : "Submit a Booking Request"}/>

                    {showBookingForm && <BookingForm onBook= {submitRequest} id= {id} />}
                      
                    </div>
                  
       
                </div>
              
            </div>
         
        </div>


{/* 
                    <img src={venueState.venue_image} alt={""}/>
                    <h2> {venueState.venue_name} </h2>
                    <h4> {venueState.venue_address}</h4>
                    <h4> {venueState.venue_description} </h4>

                    <BookBtn onClick= {toggleBookingForm} text= {showBookingForm ? "Cancel Request" : "Submit a Booking Request"}/>

                    {showBookingForm && <BookingForm onBook= {submitRequest} id= {id} />}
                     */}

                </>
            }
        </> 
    )
}

export default SingleVenuePage