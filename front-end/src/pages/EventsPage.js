import { useEffect, useState} from 'react'
import SingleEventItem from'../components/singleEventItem/SingleEventItem'

//const event_id = 1

async function fetchEvents(artist_email){
    
    const res = await (await fetch('https://events.sotf2022-01.com/api/events'))
    //const res = await fetch(process.env.ACTCITING-REACT-URI + '/')
    const data = await res.json()

    console.log("data", data)
    //const event = data.find(events => events.event_id === event_id)// && events.artist_email === artist_email)    
    return data.filter(events =>  events.artist_email === artist_email)
}

const SearchEventsForm = (props) =>{
    const [submitBtnState, setSubmitBtnState] = useState(true)
    // const [eventId, setEventId] = useState(0)
    const [artistEmail, setArtistEmail] = useState('')
    const [event, setEvent] = useState([])
    

    useEffect(() => {
        fetchEvents(artistEmail).then(setEvent)
    }, [submitBtnState])
    

    const onSubmit = (e) =>{
        // TO PREVENT THE PAGE RELOAD ON SUBMIT
        e.preventDefault()
        
        console.log(event)

        setSubmitBtnState(!submitBtnState)
    
    }

    return (
            <> 
            <div class= "eventFlex">
            <div class="eventTicketInput">
                <h4> To check the status of your current events, enter your email below: </h4>
					<form class="form-group" onSubmit={onSubmit}>
                    <div>
                        <label>Enter your email </label>
                        <input type='text' class="form-control input-sm" placeholder="johnsmith@email.com" 
                        value={artistEmail} onChange={(e)=> {setArtistEmail(e.target.value)}}
                        />
                    </div>
                    <input type='submit' class="btn btn-primary" value='Find Event' />
                </form>
                </div>

                <div class= "eventReview">
                <EventsView event={event} />
                </div>
                </div>
        
                </>

    )
    
}




const  EventsView = (props) =>{
    console.log("event array length", props.event.length)
    console.log(props.event.length === 0)
    return (
        <>
        
            {   
            
                props.event.length === 0 ? <p> No events to show </p> : props.event.map(events => {
                    return <SingleEventItem event={events} />
                })
            
            }
        </>
        
    )
}


export default SearchEventsForm