import React from 'react'

const Filter = ({ setNewFilterValue }) => {
    return (
        <input onChange={({ target }) => setNewFilterValue(target.value)}/>
    )
}

export default Filter
