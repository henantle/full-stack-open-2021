import React from 'react'

const Total = ({course}) => {
console.log(course);
const numbers = course.parts.map(part => part.exercises);
console.log("numbers", numbers)
const total = 
numbers.reduce( (sum, current) => sum + current, 0);
    console.log("total", total);
  return (
        <strong>total of { total } exercises</strong>
  )
    
};

export default Total