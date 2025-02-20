import Persons from "./components/Persons.tsx"
import PersonForm from "./components/PersonForm.tsx"
import Filter from "./components/Filter.tsx"
import Notification from "./components/Notification.tsx"
import personService from './services/personService.tsx'

import { useState, useEffect } from 'react'

const App = () => {
  const [persons, setPersons] = useState<any[]>([]) 
  const [filteredPersons, setFilteredPersons] = useState<any[]>([])
  const [newName, setNewName] = useState('')
  const [newNumber, setNewNumber] = useState('')
  const [filter, setFilter] = useState('')
  const [errorMessage, setErrorMessage] = useState('')

  useEffect(() => {
    personService
      .getAll()
      .then((response: { data: any }) => {
        setPersons(response.data)
      })
  }, [])

  const addPerson = (event: any) => {
    event.preventDefault()

    const personObject = {
      name: newName,
      number: newNumber,
    }

    const updatePerson = persons.find(person => person.name === newName)
    if (updatePerson) {
      window.confirm(`${newName} is already added to phonebook, will modify entry`)
      const modifyPerson = { ...updatePerson, number: newNumber }
      personService
        .update(updatePerson.id, modifyPerson)
        .then(() => {
          setErrorMessage('Updated ' + updatePerson.name)
        })
    } else {
      personService
      .create(personObject)
      .then((response: { data: any }) => {
        setNewName('')
        setNewNumber('')
        setPersons(persons.concat(response.data))
        setErrorMessage('Added ' + `${personObject.name}`)
      })
    }
  }

  const handleDelete = (id: any, name: any) => {
    personService
      .remove(id)
      .then(() => {
        const deletedPerson = persons.filter((person: any) => person.id !== id)
        if (deletedPerson) {
          setPersons(deletedPerson)
          setErrorMessage('Removed ' + name)
        } else {
          setErrorMessage('Error removing ' + name)
        }
      })
  }

  const handleFilter = (event: any) => {
    setFilter(event.target.value);
    const result = persons.filter((person) => person.name.toLowerCase().includes(event.target.value.toLowerCase()));
    setFilteredPersons([...result]);
  }

  const handleNameUpdate = (event: any) => {
    setNewName(event.target.value)
  }

  const handleNumberUpdate = (event: any) => {
    setNewNumber(event.target.value);
  }

  return (
    <div>
      <h2>Phonebook</h2>
      <Notification message={errorMessage}/>
      <Filter filter={filter} handleFilter={handleFilter}/>

      <PersonForm addPerson={addPerson} 
        newName={newName}
        newNumber={newNumber}
        handleNameUpdate={handleNameUpdate} 
        handleNumberUpdate={handleNumberUpdate} />

      <h2>Numbers</h2>
        {filter ? 
          <Persons array={filteredPersons} handleDelete={handleDelete}/> 
        : <Persons array={persons} handleDelete={handleDelete}/>}
    </div>
  )
}

export default App