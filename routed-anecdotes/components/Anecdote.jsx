export const Anecdote = ({ anecdote }) => {
  if (anecdote)
    console.log(anecdote)
  return (
    <div>
      <h2>{anecdote.content}</h2>    
    </div>
  )
}
