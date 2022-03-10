import * as React from 'react'
import { useHistory } from 'react-router-dom'
import FilterForm from '../components/filterForm/filterForm'
import Footer from '../components/footer'

const SplashPage = () => {
    const history = useHistory()
    const allvenues = () => {
        history.push(`/venues`)
    }

    const onFilter = (location) => {
        
        history.push(`/venues/location${location}`)
    }

    return (
        <>
            <div class="heroHeader">
                <img id="heroImage" src="./Assets/images/actsentlogo.png" alt="ActSent - Part of GigStr" />
                <br />
                <br />
                <p id="heroSubtitle"> Find the perfect venue for your events</p>
            </div>
            <div>
               
                <FilterForm onFilter={onFilter} allvenues={allvenues}></FilterForm>
            </div>
            <Footer></Footer>
        </>



    )
}
export default SplashPage