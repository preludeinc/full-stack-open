import { useField } from '../hooks/useField'
import { Alert, Box, Button, InputLabel, TextField } from '@mui/material'

export const CreateNew = ({ addNew }) => {
  const contentInput = useField('text')
  const authorInput = useField('text')
  const infoInput = useField('text')

  const { onReset: contentReset, ...content } = contentInput
  const { onReset: authorReset, ...author } = authorInput
  const { onReset: infoReset, ...info } = infoInput

  const handleSubmit = (e) => {
    e.preventDefault()
    console.log(content)
    addNew({
      content: content.value,
      author: author.value,
      info: info.value,
      votes: 0,
    })
  }

  const handleReset = (e) => {
    e.preventDefault()
    contentReset()
    authorReset()
    infoReset()
  }

  return (
    <Box sx={{ m: 2 }}>
      <h2>create a new anecdote</h2>
      <form onSubmit={handleSubmit}>
        <div>
          <InputLabel>content</InputLabel>
          <TextField label='content' {...content} />
        </div>
        <div>
          <InputLabel>author</InputLabel>
          <TextField label='author' {...author} />
        </div>
        <div>
          <InputLabel>url for more info </InputLabel>
          <TextField label='info' {...info} />
        </div>
        <Button variant='contained' color='secondary' onClick={handleSubmit}>create</Button>
        <Button variant='contained' color='secondary' onClick={handleReset}>reset</Button>
      </form>
    </Box>
  )
}
