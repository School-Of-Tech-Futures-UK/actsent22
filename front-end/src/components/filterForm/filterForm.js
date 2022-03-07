import {useState} from 'react'
const FilterForm = (props) => {
    const [date, setDate] = useState()
    const [location, setLocation] = useState('')
    const [capacity, setCapacity] = useState()

    const onSubmit = (e) => {
        e.preventDefault()


        props.onFilter(location)
    }

    return(

        <form onSubmit={onSubmit}>

        <div>
            <label>Date of Event</label>
            <input type={'date'} value={date}></input>
        </div>
        
        <div>
            <label for='location'>location</label>
            <select id = 'location' value={location} onChange={(e)=>{setLocation(e.target.value)}}>
            <option value="">--Please select a location--</option>
            <option value="London">London</option>
            <option value="Manchester">Manchester</option>
            <option value="Birmingham">Birmingham</option>
            </select>
        </div>

        <div>
            <label>Venue Capacity</label>
            <input type={'number'} value={capacity}></input>
        </div>

        <input type='submit' value='View Selected Venues' />
    </form>
    )
}

export default FilterForm