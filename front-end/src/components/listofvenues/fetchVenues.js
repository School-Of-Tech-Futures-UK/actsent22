async function fetchVenues(){
   
    const res = await fetch('https://venues.sotf2022-01.com/api/venue_info')
    //const res = await fetch(process.env.ACTCITING-REACT-URI + '/')
    const data = await res.json()
    console.log(data)
    return data
}

export default fetchVenues