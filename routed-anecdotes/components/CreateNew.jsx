import { useField } from '../hooks/useField'

export const CreateNew = ({ addNew }) => {
  const contentInput = useField('text')
  const authorInput = useField('text')
  const infoInput = useField('text')

  const { onReset: contentReset, ...content } = contentInput
  const { onReset: authorReset, ...author } = authorInput
  const { onReset: infoReset, ...info } = infoInput

  const handleSubmit = (e) => {
    e.preventDefault()
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
    <div>
      <h2>create a new anecdote</h2>
      <form onSubmit={handleSubmit}>
        <div>
          content
          <input {...content} />
        </div>
        <div>
          author
          <input {...author} />
        </div>
        <div>
          url for more info
          <input {...info} />
        </div>
        <button onClick={handleSubmit}>create</button>
        <button onClick={handleReset}>reset</button>
      </form>
    </div>
  )
}
