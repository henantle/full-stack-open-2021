import Filter from './components/filter'
import Persons from './components/persons'
import Personform from './components/personform'
import React, { useState, useEffect } from 'react'
import axios from 'axios'

const App = () => {
  const [ persons, setPersons] = useState([]) 
  const [ newName, setNewName ] = useState('')
  const [ newPhoneNumber, setNewPhoneNumber ] = useState('')
  const [ newFilterValue, setNewFilterValue ] = useState('')

  useEffect(() => {
    console.log('effect')
    axios.get('http://localhost:3001/persons').then(response => {
      console.log('promise fulfilled')
      setPersons(response.data)
    })  
  }, [])  
  console.log('render', persons.length, 'notes')

  let namesToShow = newFilterValue !== "" ? 
  persons.filter((person) => person.name.toLowerCase().includes(newFilterValue.toLowerCase())) : persons
 
  return (
    <div>
      <h2>Phonebook</h2>
      filter shown with <Filter setNewFilterValue={setNewFilterValue}/>
      <Personform 
      newName={newName} 
      setNewName={setNewName} 
      newPhoneNumber={newPhoneNumber} 
      setNewPhoneNumber={setNewPhoneNumber}
      persons = {persons}
      setPersons = {setPersons} />
      <Persons namesToShow={namesToShow} />
    </div>
  )

}

export default App