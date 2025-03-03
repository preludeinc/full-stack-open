import { useSelector, useDispatch } from 'react-redux'
import { addVoteToAnecdote } from '../reducers/anecdoteReducer'
import { showNotification } from '../reducers/notificationReducer'

const AnecdoteList = () => {
  const anecdotes = useSelector(state => state.anecdotes)
  const filter = useSelector(state => state.filter)
  const dispatch = useDispatch()

  const sortedAnecdotes = anecdotes.slice().sort((a, b) => a.votes - b.votes)
  const filteredAnecdotes = sortedAnecdotes.filter((anecdote) => anecdote.content.toLowerCase().includes(filter.toLowerCase()))

  const vote = (id) => {
    let anecdote = anecdotes.find(anecdote => anecdote.id === id)
    dispatch(addVoteToAnecdote(id))
    dispatch(showNotification(`new anecdote added: ${anecdote.content}`), 10)
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