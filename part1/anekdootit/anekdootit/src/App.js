import React, { useState } from 'react'

const Button = ({handleClick, text}) => {
  return (
    <button onClick={handleClick}>{text}</button>
  )
}

const Anecdote = ({anecdote, votes}) => (
  <p>{anecdote} Votes: {votes}</p>
)

const App = () => {
  const anecdotes = [
    'If it hurts, do it more often.',
    'Adding manpower to a late software project makes it later!',
    'The first 90 percent of the code accounts for the first 90 percent of the development time...The remaining 10 percent of the code accounts for the other 90 percent of the development time.',
    'Any fool can write code that a computer can understand. Good programmers write code that humans can understand.',
    'Premature optimization is the root of all evil.',
    'Debugging is twice as hard as writing the code in the first place. Therefore, if you write the code as cleverly as possible, you are, by definition, not smart enough to debug it.',
    'Programming without an extremely heavy use of console.log is same as if a doctor would refuse to use x-rays or blood tests when dianosing patients.'
  ]
   
  const [selected, setSelected] = useState(0)
  const [votes, setVotes] = useState(new Array(anecdotes.length).fill(0))
  const [mostVotedAnecdote, setMostVotedAnecdote] = useState(selected)

  const handleNewRandom = () => {
    setSelected(Math.floor(Math.random() * anecdotes.length))
  }

  const handleNewVote = () => {
    const copyOfVotes = [...votes]
    copyOfVotes[selected] += 1
    setVotes(copyOfVotes)

    if (copyOfVotes[selected]>copyOfVotes[mostVotedAnecdote]) {
      setMostVotedAnecdote(selected)
    }
  }

  return (
    <div>
      <h1>Anecdote of the day</h1>
      <Anecdote anecdote={anecdotes[selected]} votes={votes[selected]}/>
      <Button handleClick={handleNewVote} text="Vote" />
      <Button handleClick={handleNewRandom} text="New Random Anecdote" />
      <h1>Anecdote with most votes</h1>
      <Anecdote anecdote={anecdotes[mostVotedAnecdote]} votes={votes[mostVotedAnecdote]}/>
    </div>
  )
}

export default App