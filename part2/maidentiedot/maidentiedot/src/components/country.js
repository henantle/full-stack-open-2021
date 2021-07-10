import React from 'react'
import { useState, useEffect } from 'react'
import axios from 'axios'

const Country = (props) => {
    console.log(props);
    const name = props.country.name
    const capital = props.country.capital
    const population = props.country.population
    const languages = props.country.languages.map(language => language.name)
    const flagUrl = props.country.flag
    const [ showDetails, setShowDetails ] = useState(props.showDetails ? true : false)
    const [ weatherData, setWeatherData ] = useState([])

    const handleClick = (event) => {
        setShowDetails(true);
    }

    useEffect(() => {
        console.log('effect weather')
        const API_KEY = process.env.REACT_APP_API_KEY
        if (showDetails) {
        axios.get(`http://api.weatherstack.com/current'?access_key=${API_KEY}&query=${capital}`).then(response => {
          console.log('promise fulfilled')
          setWeatherData(response.data)
        })}
      }, [])
    console.log('render', weatherData.length, 'notes')
    

    return (
        <div>
            { showDetails ? 
            <>
            <h2>{name}</h2>
            <p>capital {capital}</p>
            <p>population {population}</p>
            <h3>languages</h3>
            <ul>
                {
                    languages.map(language => <li>{language}</li>)
                }
            </ul>
            <img width="150" src={flagUrl} alt="Flag of the country" />
            </> :
            <div>
            <span>{name}</span>
            <button onClick={handleClick}>show</button>
            </div>
            }
        </div>
    )
}

export default Country

