import React from 'react'

const Person = (props) => {
    console.log(props);
    return (
        <p>
            {props.name} {props.phoneNumber}
        </p>
    )
}

export default Person

