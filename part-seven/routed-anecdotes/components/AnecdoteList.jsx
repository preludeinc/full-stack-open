import { Link } from 'react-router-dom'
import { 
  Table, 
  TableBody, 
  TableContainer, 
  TableCell, 
  TableRow, 
  Paper } from '@mui/material'

export const AnecdoteList = ({ anecdotes }) => {
  if (anecdotes)
  return (
    <div>
    <h2>Anecdotes</h2>
    <TableContainer component={Paper}>
      <Table>
        <TableBody>
        {anecdotes.map((anecdote) => (
          <TableRow key={anecdote.id}>
            <TableCell>
              <Link to={`/anecdotes/${anecdote.id}`}>{anecdote.content}</Link>
            </TableCell>
          </TableRow>
        ))}
        </TableBody>
      </Table>
    </TableContainer>
  </div>
  )
}
