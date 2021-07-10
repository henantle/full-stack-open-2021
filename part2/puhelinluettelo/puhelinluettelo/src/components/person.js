import React from 'react'

const Person = (props) => {
    const handleDelete = props.handleDelete
    console.log(props);

    return (
        <div>
        <span>{props.name} {props.number}</span>
        <button onClick={() => handleDelete(props.id)}>delete</button>
        </div>
    )
}

export default Person

