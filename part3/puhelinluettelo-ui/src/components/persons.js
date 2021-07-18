import React from 'react'
import Person from './person'

const Persons = (props) => {
    const namesToShow = props.namesToShow
    const handleDelete = props.handleDelete
    console.log(namesToShow)
    console.log(typeof namesToShow)
    return (
        <div>
            <h2>Numbers</h2>
            {
             namesToShow.map(person => <Person key={person.id} id={person.id} name={ person.name } number={person.number} handleDelete = {handleDelete} />)
            }
        </div>
    )
}

export default Persons