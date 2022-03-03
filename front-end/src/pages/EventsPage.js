import { useEffect, useState} from 'react'
import SingleEventItem from'../components/singleEventItem/SingleEventItem'

//const event_id = 1

async function fetchEvents(artist_email){
    const res = await fetch('http://localhost:3002/events')
    //const res = await fetch(process.env.ACTCITING-REACT-URI + '/')
    const data = await res.json()

    // console.log("data", data)
    //const event = data.find(events => events.event_id === event_id)// && events.artist_email === artist_email)    
    return data.filter(events =>  events.artist_email === artist_email)
}

const SearchEventsForm = (props) =>{
    const [submitBtnState, setSubmitBtnState] = useState(true)
    // const [eventId, setEventId] = useState(0)
    const [artistEmail, setArtistEmail] = useState('')
    const [event, setEvent] = useState(undefined)
    

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

                <form onSubmit={onSubmit}>

                    <div>
                        <label>Enter your email </label>
                        <input type='text' placeholder="1" 
                        value={artistEmail} onChange={(e)=> {setArtistEmail(e.target.value)}}
                        />
                
                    </div>

                    <input type='submit' value='Find Event' />

                </form>

                <EventsView event={event} />
        
            </>
    )
    
}



const  EventsView = (props) =>{

    // const [event, setEvent] = useState()

    // useEffect(() => {
    //     fetchEvents(props.event.artistEmail).then(setEvent)
    // }, [])
    // console.log("props.event = ", props.event, props.event===undefined)
    // console.log("props = ", props)
    return (
        <>
        
            {
                props.event === undefined ? <p> No events to show </p> : 
                // <SingleEventItem event={props.event} />
                props.event.map(events => {
                    return <SingleEventItem event={events} />
                })
            
            }
        </>
        
    )
}


export default SearchEventsForm