import React from 'react'

const Country = (props) => {
    console.log(props);
    const name = props.country.name
    const capital = props.country.capital
    const population = props.country.population
    const languages = props.country.languages.map(language => language.name)
    const flagUrl = props.country.flag
    const showDetails = props.showDetails

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
            <img width="150" src={flagUrl} />
            </> :
            <p>{name}</p>
            }
        </div>
    )
}

export default Country

