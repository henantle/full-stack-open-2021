import Filter from './components/filter'
import Persons from './components/persons'
import Personform from './components/personform'
import React, { useState, useEffect } from 'react'
import Personservice from './services/personservice'
import Notification from './components/notification'

const App = () => {
  const [ persons, setPersons] = useState([]) 
  const [ newName, setNewName ] = useState('')
  const [ newPhoneNumber, setNewPhoneNumber ] = useState('')
  const [ newFilterValue, setNewFilterValue ] = useState('')
  const [ notificationMessage, setNotificationMessage ] = useState(null)

  useEffect(() => {
    Personservice
      .getAll()
      .then(initialPersons => {
        console.log(initialPersons)
        setPersons(persons.concat(initialPersons))
      })
  }, [])

  const handleDelete = (id) => {
    const person = persons.find((foo) => foo.id === id)
    const confirmDeletion = window.confirm(`Delete ${person.name}?`)
    if (confirmDeletion) {
      Personservice.exterminate(id).then(() => {
        const deletePersonFromUI = persons.filter((person) => person.id !== id);
        setPersons(deletePersonFromUI);
        setNotificationMessage(
          `Contact '${person.name}' was successfully removed from server`
        )
        setTimeout(() => {
          setNotificationMessage(null)
        }, 5000)
      });
    }
  };

  let namesToShow = newFilterValue !== "" ? 
  persons.filter((person) => person.name.toLowerCase().includes(newFilterValue.toLowerCase())) : persons
 
  return (
    <div>
      <h2>Phonebook</h2>
      <Notification message={notificationMessage} />
      filter shown with <Filter setNewFilterValue={setNewFilterValue}/>
      <Personform 
      newName={newName} 
      setNewName={setNewName} 
      newPhoneNumber={newPhoneNumber} 
      setNewPhoneNumber={setNewPhoneNumber}
      persons = {persons}
      setPersons = {setPersons} 
      setNotificationMessage = {setNotificationMessage} />
      <Persons 
      namesToShow={namesToShow} 
      handleDelete={handleDelete} 
      setNotificationMessage = {setNotificationMessage} />
    </div>
  )

}

export default App