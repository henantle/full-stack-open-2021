import React from 'react'
import Country from './country'

const Countries = (props) => {
    const namesToShow = props.namesToShow
    const tooManyResults = namesToShow.length > 10
    const onlyOneHit = namesToShow.length === 1
    return (
        <div>
            {
            tooManyResults ? <p>Too many matches, specify another filter</p> :
            namesToShow.map(country => <Country key={country.name} country={country} showDetails={onlyOneHit} />)
            }
        </div>
    )
}

export default Countries