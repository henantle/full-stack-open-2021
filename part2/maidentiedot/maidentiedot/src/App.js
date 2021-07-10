import Filter from './components/filter'
import Countries from './components/countries'
import React, { useState, useEffect } from 'react'
import axios from 'axios'

const App = () => {
  const [ countries, setCountries] = useState([]) 
  const [ newFilterValue, setNewFilterValue ] = useState('')

  useEffect(() => {
    console.log('effect countries')
    axios.get('https://restcountries.eu/rest/v2/all').then(response => {
      console.log('promise fulfilled')
      setCountries(response.data)
    })  
  }, [])  
  console.log('render', countries.length, 'notes')

  let namesToShow = newFilterValue !== "" ? 
  countries.filter((country) => country.name.toLowerCase().includes(newFilterValue.toLowerCase())) : countries
 
  return (
    <div>
      find countries <Filter setNewFilterValue={setNewFilterValue}/>
      <Countries key={namesToShow.name} namesToShow={namesToShow} />
    </div>
  )

}

export default App