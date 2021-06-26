import React from 'react'
import Content from './content';
import Header from './header';
import Total from './total';

const Course = ({ course }) => {
  console.log(course);
  return (
    <div>
        <Header course={course.name} />
        <Content course={course} />
        <Total course={course}/>
    </div>
  )
};

export default Course;