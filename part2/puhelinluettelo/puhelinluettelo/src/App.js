import React, { useState } from 'react'
import Filter from './components/filter'
import Person from './components/person'
import Persons from './components/persons'
import Personform from './components/personform'

const App = () => {
  const [ persons, setPersons] = useState([
    { name: 'Arto Hellas', phonenumber: '040-123456' },
    { name: 'Ada Lovelace', phonenumber: '39-44-5323523' },
    { name: 'Dan Abramov', phonenumber: '12-43-234345' },
    { name: 'Mary Poppendieck', phonenumber: '39-23-6423122' }
  ]) 
  const [ newName, setNewName ] = useState('')
  const [ newPhoneNumber, setNewPhoneNumber ] = useState('')
  const [ newFilterValue, setNewFilterValue ] = useState('')

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