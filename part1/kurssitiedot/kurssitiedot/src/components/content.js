import React from 'react'
import Part from './part';

const Content = ({ parts }) => {
  console.log(parts);
  return (
    <div>
      <Part parts={parts[0].name} exercises={parts[0].exercises} />
      <Part parts={parts[1].name} exercises={parts[1].exercises} />
      <Part parts={parts[2].name} exercises={parts[2].exercises} />
    </div>
  )
};

export default Content