import { useState, useEffect } from 'react'
import Filter from './components/Filter'
import PersonForm from './components/PersonForm'
import Persons from './components/Persons'
import personService from './services/persons'

const Notification = ({ message, type }) => {
  if (message === null) {
    return null
  }

  return (
    <div className={type}>
      {message}
    </div>
  )
}

const App = () => {
  const [persons, setPersons] = useState([]) 
  const [newName, setNewName] = useState('')
  const [newNumber, setNewNumber] = useState('')
  const [filteredPersons, setFilteredPersons] = useState(persons)
  const [errorMessage, setErrorMessage] = useState(null)
  const [type, setType] = useState('success')

  useEffect(() => {
    personService
      .getAll()
      .then(initialPersons => {
        setPersons(initialPersons)
        setFilteredPersons(initialPersons)
      })
  }, [])

  const addName = (event) => {
    event.preventDefault()
    const existing = persons.find(person => person.name.toUpperCase() === newName.toUpperCase())

    if (!existing) {
      const person = {
        name: newName,
        number: newNumber,
        id: persons.length + 1
      }

      personService
        .create(person)
        .then(returnedPerson => {
          setErrorMessage(`Added '${returnedPerson.name}'`)
          setType('success')
          setTimeout(() => {
            setErrorMessage(null)
          }, 5000)

          setPersons(persons.concat(returnedPerson))
          setFilteredPersons(filteredPersons.concat(returnedPerson))
        })
      
    } else {
      if (window.confirm(`${newName} is already added to phonebook, replace the old number with a new one?`)) {
        const person = persons.find(person => person.name.toUpperCase() === newName.toUpperCase())
        const changedPerson = {...person, number: newNumber}

        personService
          .update(person.id, changedPerson)
          .then(returnedData => {
            setErrorMessage(`Updated '${changedPerson.name}'`)
            setType('success')
            setTimeout(() => {
              setErrorMessage(null)
            }, 5000)

            setPersons(persons.map(p => p.id !== person.id ? p : returnedData))
            setFilteredPersons(filteredPersons.map(f => f.id !== person.id ? f : returnedData))
          })
      } else {
        alert(`${newName} not updated`)
      }
    }

    setNewName('')
    setNewNumber('')
  }

  const handleNameChange = (event) => {
    setNewName(event.target.value)
  }

  const handleNumberChange = (event) => {
    setNewNumber(event.target.value)
  }

  const handleFilter = (event) => {
    const filterPersons = persons.filter(person => person.name.toUpperCase().match(event.target.value.toUpperCase()))
    setFilteredPersons(filterPersons)
  }

  const removePerson = (id) => {
    return () => {
      const person = persons.find(person => person.id === id)

      window.confirm(`delete ${person.name}?`) 
        ? personService
            .remove(id)
            .then(returnData => {
              setErrorMessage(`Deleted '${person.name}'`)
              setType('success')
              setTimeout(() => {
                setErrorMessage(null)
              }, 5000)

              setPersons(persons.filter(person => person.id !== id))
              setFilteredPersons(filteredPersons.filter(person => person.id !== id))
            })
            .catch(error => {
              setErrorMessage(`Information of '${person.name}' was already removed from server`)
              setType('error')
              setTimeout(() => {
                setErrorMessage(null)
              }, 5000)

              setPersons(persons.filter(person => person.id !== id))
              setFilteredPersons(filteredPersons.filter(person => person.id !== id))
            })
        : alert(`failed to delete ${person.name}`)
    }
  }

  return (
    <div>
      <h2>Phonebook</h2>
      <Notification message={errorMessage} type={type} />
      <Filter onChange={handleFilter} />

      <h2>Add New</h2>
      <PersonForm onSubmit={addName} handleNameChange={handleNameChange} handleNumberChange={handleNumberChange} name={newName} number={newNumber} />

      <h2>Numbers</h2>
      <Persons persons={filteredPersons} removePerson={removePerson} />
    </div>
  )
}

export default App