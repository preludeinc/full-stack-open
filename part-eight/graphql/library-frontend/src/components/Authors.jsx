import { useState } from 'react'
import { useQuery, useMutation } from '@apollo/client';
import { ALL_AUTHORS, UPDATE_BIRTH_YEAR } from '../queries';

const Authors = ({ show }) => {
  const [name, setName] = useState('');
  const [birthyear, setBirthYear] = useState('');

  const { data, error, loading } = useQuery(ALL_AUTHORS);
  
  let [ updateBday ] = useMutation(UPDATE_BIRTH_YEAR, {
    refetchQueries: [{ query: ALL_AUTHORS }]
  });

  if (!show) {
    return null;
  }

  if (loading) {
    return <div>loading...</div>
  }

  if (error) {
    return <div>{error.message}</div>
  }

  let authors = [];
  authors = data.allAuthors;

  const submit = async (event) => {
    event.preventDefault()

    updateBday({ variables: { name, setBornTo: parseInt(birthyear) }})

    console.log('updated birth year...')

    setName('')
    setBirthYear('')
  }

  return (
    <>
      <div>
        <h2>authors</h2>
        <table>
          <tbody>
            <tr>
              <th></th>
              <th>born</th>
              <th>books</th>
            </tr>
            {authors.map((a) => (
              <tr key={a.name}>
                <td>{a.name}</td>
                <td>{a.born}</td>
                <td>{a.bookCount}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <form onSubmit={submit}>
        <h2>Set birthyear</h2>
        <div>
          name
          <input
            value={name}
            onChange={({ target }) => setName(target.value)}
          />
        </div>
        <div>
          born
          <input
            value={birthyear}
            onChange={({ target }) => setBirthYear(target.value)}
          />
        </div>
        <button type="submit">update author</button>
      </form>
    </>
  );
};

export default Authors;
