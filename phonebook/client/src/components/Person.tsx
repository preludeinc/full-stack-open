const Person = ({ name, number, id, handleDelete }: 
  { name: string, number: string, id: number, handleDelete: any}) => {
    return (
      <>
      	<li key={id}>{name} {number} <button onClick={() => handleDelete(id, name)}>Delete</button></li>
      </>
  )
}

export default Person;
