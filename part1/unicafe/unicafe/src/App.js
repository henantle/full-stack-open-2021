import React, { useState } from 'react'

const Button = (props) => {
  return (
    <button onClick={props.handleClick}>{props.text}</button>
  )
}

const Statistics = ({ good, neutral, bad, total, average, positive, showStatistics }) => {
  if (showStatistics) { return (
  <div>
    <table>
      <tbody>
        <StatisticLine  name="good" stat={good}/>
        <StatisticLine  name="neutral" stat={neutral}/>
        <StatisticLine  name="bad" stat={bad}/>
        <StatisticLine  name="average" stat={average}/>
        <StatisticLine  name="positive" stat={positive}/>
      </tbody>
    </table>
  </div>
  )} else {
    return (<p>No feedback given yet</p>)
  }
}

const StatisticLine = (props) => {
  return (
    <tr>
      <td>
        {props.name}
      </td>
      <td>
        {props.stat}
      </td>
    </tr>
  )
}

const App = () => {
  // tallenna napit omaan tilaansa
  const [good, setGood] = useState(0)
  const [neutral, setNeutral] = useState(0)
  const [bad, setBad] = useState(0)
  const [count, setCount] = useState(0)

  const setGoodVal = (newVal) => {
    setGood(newVal)
    setCount(count + 1)
  }

  const setNeutralVal = (newVal) => {
    setNeutral(newVal)
    setCount(count + 1)
  }

  const setBadVal = (newVal) => {
    setBad(newVal)
    setCount(count + 1)
  }

  const average = (good * 1 + neutral * 0 + bad * -1)
  const positive = good / count
  const showStatistics = count > 0;

  return (
    <div>
      <h1>give feedback</h1>
      <Button handleClick={() => setGoodVal(good + 1)} text="good"/>
      <Button handleClick={() => setNeutralVal(neutral + 1)} text="neutral"/>
      <Button handleClick={() => setBadVal(bad + 1)} text="bad"/>
      <h1>statistics</h1>
      <Statistics good={good} neutral={neutral} bad={bad} average={average} positive={positive} showStatistics={showStatistics} />
    </div>
  )
}

export default App