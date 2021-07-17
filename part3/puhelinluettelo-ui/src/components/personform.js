import React from 'react'
import personservice from '../services/personservice'

const Personform = (props) => {

    const newName = props.newName
    const newPhoneNumber = props.newPhoneNumber
    const persons = props.persons
    const setPersons = props.setPersons
    const setNewName = props.setNewName
    const setNewPhoneNumber = props.setNewPhoneNumber
    const setNotificationMessage = props.setNotificationMessage

    const addName = (event) => {
        event.preventDefault()
        const contactObject = {
          name: newName,
          number: newPhoneNumber
        }
        const alreadyExistingContact = persons.find((person) => person.name === newName);
        
        if (alreadyExistingContact) {
          const confirmUpdate = window.confirm(`${contactObject.name} is already added to phonebook, replace the old number with a new one?`);
          console.log(alreadyExistingContact)
          if (confirmUpdate) {
            const updatedContact = {...alreadyExistingContact, number: newPhoneNumber}
            const personId = updatedContact.id
            console.log(updatedContact)
            console.log(personId)
            personservice.update(personId, updatedContact).then((returnedContact) => {
              setPersons(persons.map((person) => person.id !== personId ? person : returnedContact))
              setNotificationMessage(
                `Contact '${updatedContact.name}' was successfully updated to server`
              )
              setTimeout(() => {
                setNotificationMessage(null)
              }, 5000)
            })
          }
        } else {
            setPersons(persons.concat(contactObject))
            personservice.create(contactObject).then(returnedContact => {
              setPersons(persons.concat(returnedContact))
              setNewName('')
              setNewPhoneNumber('')
              setNotificationMessage(
                `Contact '${contactObject.name}' was successfully saved to server`
              )
              setTimeout(() => {
                setNotificationMessage(null)
              }, 5000)
            })
        }
      }
    
      const handleNameChange = (event) => {  
          console.log(event.target.value)
          setNewName(event.target.value)  
        }
    
      const handlePhoneNumberChange = (event) => {  
        console.log(event.target.value)
        setNewPhoneNumber(event.target.value)  
      }

    return (
        <form onSubmit={addName}>
            <h2>add a new</h2>
            <div>
            name: <input value={newName} onChange={handleNameChange} />
            </div>
            <div>
            phone number: <input value={newPhoneNumber} onChange={handlePhoneNumberChange} />
            </div>
            <div>
            <button type="submit">add</button>
            </div>
      </form>
    )
}

export default Personform
