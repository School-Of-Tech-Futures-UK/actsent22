import VenueListItem from '../venuelistitem/VenueListItem'
import { useEffect, useState} from 'react'
import { useParams} from "react-router-dom"


async function fetchVenues(){
   
    const res = await fetch('https://venues.sotf2022-01.com/api/venue_info')
    //const res = await fetch(process.env.ACTCITING-REACT-URI + '/')
    const data = await res.json()
    console.log(data)
    return data
}

const  ListOfVenues = (props) =>{

    const [listState, setListState] = useState([])

    const { location} = useParams()

    useEffect(() => {
        fetchVenues().then(setListState)
    }, [])

    let filtered_venues = listState

    if (location) {
        filtered_venues = listState.filter(venue => {
            return venue.venue_address.includes(location)
        })
    }

    return (
        <>
            {
                filtered_venues.map(venue => {
                    return <VenueListItem key= {venue.venue_id} id= {venue.venue_id} name= {venue.venue_name} 
                            location= {venue.venue_address} description= {venue.venue_description} image= {venue.venue_image}/>
                })
            }
        </>
    )
}

export default ListOfVenues