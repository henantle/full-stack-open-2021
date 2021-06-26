import React from 'react'
import Person from './person'

const Persons = (props) => {
    const namesToShow = props.namesToShow
    return (
        <div>
            <h2>Numbers</h2>
            {
             namesToShow.map(person => <Person key={person.name} name= { person.name } phoneNumber = {person.phonenumber} />)
            }
        </div>
    )
}

export default Persons