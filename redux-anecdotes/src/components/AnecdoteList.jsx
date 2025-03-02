import { useSelector, useDispatch } from 'react-redux'
import { voteOnAnecdote } from '../reducers/anecdoteReducer'
import { createNotification } from '../reducers/notificationReducer'

const AnecdoteList = () => {
  const anecdotes = useSelector(state => state.anecdotes)
  const filter = useSelector(state => state.filter)
  const dispatch = useDispatch()

  const sortedAnecdotes = anecdotes.slice().sort((a, b) => a.votes - b.votes)
  const filteredAnecdotes = sortedAnecdotes.filter((anecdote) => anecdote.content.toLowerCase().includes(filter.toLowerCase()))

  const vote = (id) => {
    let anecdote = anecdotes.find(anecdote => anecdote.id === id)
    dispatch(voteOnAnecdote(id))
    dispatch(createNotification(`you voted '${anecdote.content}'`))
  }

  return (
    <>
    {filteredAnecdotes.map(anecdote =>
      <div key={anecdote.id}>
        <div>
          {anecdote.content}
        </div>
        <div>
          has {anecdote.votes}
          <button onClick={() => vote(anecdote.id)}>vote</button>
        </div>
      </div>
    )}
    </>
  )
}

export default AnecdoteList