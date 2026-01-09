import React, { useEffect, useState } from 'react'
import { Col, Container, Form, Row } from 'react-bootstrap'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faMagnifyingGlass } from '@fortawesome/free-solid-svg-icons'
// import Image from "react-bootstrap/Image";
import clear_icon from '../icon/clear.png'
import cloud_icon from '../icon/cloud.png'
import drizzle_icon from '../icon/drizzle.png'
import rain_icon from '../icon/rain.png'
import snow_icon from '../icon/snow.png'

function Home() {
    //State to Store location
    const [location,setlocation] = useState("")
    const [input,setinput] = useState("")

    //Icons

    const allIcons = {
        "01d" : clear_icon,
        "01n" : clear_icon,
        "02d" : cloud_icon,
        "02n" : cloud_icon,
        "03d" : cloud_icon,
        "03n" : cloud_icon,
        "04d" : drizzle_icon,
        "04n" : drizzle_icon,
        "09d" : rain_icon,
        "09n" : rain_icon,
        "10d" : rain_icon,
        "10n" : rain_icon,
        "13d" : snow_icon,
        "13n" : snow_icon,


    }
     const [weatherdata,setweatherdata] = useState(null)

    useEffect(()=>
    {
        fetch(`https://api.openweathermap.org/data/2.5/weather?q=${location}&units=metric&appid=77ab92033a07a3aed935a10f01b5b985`)
        .then(res => res.json())
        .then(data => {
          if (data.cod === 200) {
          setweatherdata(data)
        } 
        })
    },[location]
  )

  const icon =  allIcons[weatherdata?.weather[0]?.icon] ||clear_icon;
  return (
    <div className='min-vh-100 p-5 text-color' style={{backgroundColor : '#4e56a9ff'}}>
    <Container style={{backgroundColor : '#181d4fff', color : '#ffff'}} className='p-5 col-md-5 mx-auto shadow-lg rounded-3 text-center '>
    <h1 className='mt-5 mb-4'>Weather Application</h1>
    {/* search */}
    <Row className='text-center mt-5'>
    <Col md={10}>
    <Form.Control className='rounded-pill ' type='text' placeholder='Search' onChange={(e)=> setinput(e.target.value)}/>
    </Col>
    <Col md={2}>
    <FontAwesomeIcon onClick={()=>setlocation(input)} style={{cursor : 'pointer'}} className='mt-2' icon={faMagnifyingGlass} />
    </Col>
    </Row>
    {/* weather icon */}
    <img src={icon} alt='icon'/>
    {/* Temperature */}
    <p className='fw-bold fs-1'>{weatherdata?.main?.temp}°C</p>
    {/* Location */}
    <p className='fw-bold fs-2'>{weatherdata?.name}</p>
    {/* humidity and wind speed */}
    <Row className='mt-5'>
        <Col>
        <h5 className='mb-3'>Humidity</h5>
        <p className='fw-bold fs-2'>{weatherdata?.main?.humidity}</p>
        </Col>
        
        <Col>
        <h5 className='mb-3'>Wind Speed</h5>
        <p className='fw-bold fs-2'>{weatherdata?.wind?.speed}</p>
        </Col>
    </Row>
    {/* Passing location to Temp */}

    {/* <Temp location = {location}/> */}
    </Container>
    </div>
  )
}

export default Home