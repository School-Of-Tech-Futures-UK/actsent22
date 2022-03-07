import * as React from 'react'
import { useHistory } from 'react-router-dom'
import {useState} from 'react'
import FilterForm from '../components/filterForm/filterForm'
import Footer from '../components/footer'
//import logo from '../src/actsentlogo3.png';

const SplashPage= () => {
    const history= useHistory()
    const allvenues = () => {
        history.push(`/venues`)
    }

    const onFilter = (location) => {
        history.push(`/venues/location${location}`)
    }

    return(

        <>
        <div class="heroHeader">

            <img id="heroImage" src="./Assets/images/actsentlogo.png" alt="..."/>
            <br/>
            <br/>
            <p id="heroSubtitle"> Find the perfect venue for your events</p>
        </div>
        <div>
        <button onClick={allvenues}>View all Venues</button>
        <FilterForm onFilter={onFilter}></FilterForm>
        </div>
        <Footer></Footer>
    </>


  
    )
}
export default SplashPage