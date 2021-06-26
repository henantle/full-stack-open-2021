import React from 'react'

const Personform = (props) => {

    const newName = props.newName
    const newPhoneNumber = props.newPhoneNumber
    const persons = props.persons
    const setPersons = props.setPersons
    const setNewName = props.setNewName
    const setNewPhoneNumber = props.setNewPhoneNumber

    const addName = (event) => {
        event.preventDefault()
        const nameObject = {
          name: newName,
          phonenumber: newPhoneNumber
        }
        if (persons.find(person => person.name === nameObject.name)) {
          window.alert(`${nameObject.name} is already added to phonebook`);
        } else {
            setPersons(persons.concat(nameObject))
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
