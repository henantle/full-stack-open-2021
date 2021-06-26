import React from 'react'
import Part from './part';

const Content = ({ course }) => {
  console.log(course);
  return (
    <div>
      {
        course.parts.map(part => 
           <Part key={part.id} part={part.name} exercise={part.exercises}/>
      )}
    </div>
  )
};

export default Content