import {useState} from 'react'
const FilterForm = (props) => {
    const [date, setDate] = useState()
    const [location, setLocation] = useState('All Venues')
    const [capacity, setCapacity] = useState()

    const onSubmit = (e) => {
        e.preventDefault()
        console.log("location from dropdown", location)

        props.onFilter(location)
     
  
    }

    return(
        <div className='App'>
            <header  className="App-header">
                <h2 >
                    <br></br>
                    <br></br>

                </h2>
                <form onSubmit={onSubmit}>
                    {/* 
                        <div>
                            <label>Date of Event</label>
                            <input type={'date'} value={date}></input>
                        </div> 
                    */}

                    <div>
                    
                        <select id = 'location' value={location} class="form-control input-sm"onChange={(e)=>{setLocation(e.target.value)}}>
                            <option value="All Venues">All Venues</option>
                            <option value="London">London</option>
                            <option value="Manchester">Manchester</option>
                            <option value="Birmingham">Birmingham</option>
                        </select>
                    </div>
                    <br></br>
                    
                    
                    {/* <div>
                        <label>Venue Capacity</label>
                        <input type={'number'} value={capacity}></input>
                        </div> 
                    */}

                    <input type='submit' class="btn btn-primary" style={{backgroundColor:"grey"}}  id="eventButtonFlex" value='View Venues' />
                </form>
                <br></br>
                <br></br>
            </header>

        </div>
    )
}

export default FilterForm