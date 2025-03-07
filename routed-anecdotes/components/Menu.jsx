import { BrowserRouter as Router,
  Routes, Route, Link, useMatch
} from 'react-router-dom'
import { About } from './About'
import { Anecdote } from './Anecdote'
import { AnecdoteList } from './AnecdoteList'
import { CreateNew } from './CreateNew'

export const Menu = ({ anecdotes, addNew, vote }) => {
  const padding = {
    paddingRight: 5
  }

  const match = useMatch('/anecdotes/:id')
  const anecdote = match
    ? anecdotes.find((anecdote) => anecdote.id === Number(match.params.id))
    : null

  return (
    <div>
      <Link style={padding} to='/'>anecdotes</Link>
      <Link style={padding} to='/create'>create new</Link>
      <Link style={padding} to='/about'>about</Link>
  
      <Routes>
        <Route path='/anecdotes/:id' element={<Anecdote anecdote={anecdote} />} />
        <Route path='/about' element={<About />} />
        <Route path='/create' element={<CreateNew addNew={addNew} />} />
        <Route path='/' element={<AnecdoteList anecdotes={anecdotes} />} />
      </Routes>
    </div>
  )
}