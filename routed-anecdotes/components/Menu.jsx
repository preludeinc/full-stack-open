import { Routes, Route, Link, useMatch } from 'react-router-dom'
import { AppBar, Button, Toolbar } from '@mui/material'
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
      <AppBar position='static'>
        <Toolbar>
          <Button color='inherit' component={Link} to='/'>anecdotes</Button>
          <Button color='inherit' component={Link} to='/create'>create new</Button>
          <Button color='inherit' component={Link} to='/about'>about</Button>
        </Toolbar>
      </AppBar>
  
      <Routes>
        <Route path='/anecdotes/:id' element={<Anecdote anecdote={anecdote} />} />
        <Route path='/about' element={<About />} />
        <Route path='/create' element={<CreateNew addNew={addNew} />} />
        <Route path='/' element={<AnecdoteList anecdotes={anecdotes} />} />
      </Routes>
    </div>
  )
}