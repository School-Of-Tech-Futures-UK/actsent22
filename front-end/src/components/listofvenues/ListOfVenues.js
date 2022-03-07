import VenueListItem from '../venuelistitem/VenueListItem'
import { useEffect, useState} from 'react'
import { useParams} from "react-router-dom"
import fetchVenues from "./fetchVenues"

const ListOfVenues =(props) =>{

    const [listState, setListState] = useState([])

    const {location} = useParams()

    useEffect(() => {
        fetchVenues().then(setListState)
    }, [])

    let filtered_venues = listState
    console.log("location is, ", location)
    if (location) {
        filtered_venues = listState.filter(venue => {
            return venue.venue_address.includes(location)
        })
    }

    return (
        <>
        <div class="venuesWrapper">
            {
                filtered_venues.map(venue => {
                    return         <div class="flexWrapper">
                    <VenueListItem key= {venue.venue_id} id= {venue.venue_id} name= {venue.venue_name} 
                            location= {venue.venue_address} description= {venue.venue_description} image= {venue.venue_image}/>
                        </div>
                })
            }
            </div>
        </>

    )
}

export default ListOfVenues