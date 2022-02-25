import VenueListItem from '../venuelistitem/VenueListItem'
import { useEffect, useState} from 'react'


async function fetchVenues(){
   
    const res = await fetch('http://localhost:3002/venue')
    //const res = await fetch(process.env.ACTCITING-REACT-URI + '/')
    const data = await res.json()
    console.log(data)
    return data
  }

const  ListOfVenues = (props) =>{

    const [listState, setListState] = useState([])
    useEffect(() => {
        fetchVenues().then(setListState)
    }, []
    
    )
    // hello 
    // when database made = add key={venueID} to line 26
    return (
        <>
        {
            listState.map(venue => {
                return <VenueListItem id = {venue.id} name={venue.name} location={venue.location} description={venue.description} image={venue.image}/>
            })
        }
        </>
    )
}

export default ListOfVenues