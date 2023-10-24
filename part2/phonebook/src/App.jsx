import { useEffect, useState } from 'react'
import Filter from './components/filter';
import PersonForm from './components/person-form';
import Persons from './components/persons';
import personService from './services/persons'
import Notification from './components/notification';
import MESSAGE_TYPES from './constants/notification-message-types'

const App = () => {
  const [persons, setPersons] = useState([])
  const [newName, setNewName] = useState('');
  const [newNumber, setNewNumber] = useState('');
  const [newFilter, setNewFilter] = useState('');
  const [filteredPersons, setFilteredPersons] = useState(persons);
  const [notification, setNotification] = useState(null)

  useEffect(() => {
    personService
      .getAll()
      .then(response => {
        setPersons(response.data)
        setFilteredPersons(response.data)
      })
  }, [])

  const addName = (event) => {
    const newPersonObj = { name: newName, number: newNumber }

    event.preventDefault()

    if (isExistingPerson(newPersonObj.name)) {
      if (!window.confirm(`${newPersonObj.name} is already added to the phonebook, replace the old number with a new one?`)) return;

      const existingPerson = persons.find(person => person.name === newPersonObj.name)
      const updatedExistingPerson = { ...existingPerson, number: newNumber }

      personService
        .update(existingPerson.id, updatedExistingPerson)
        .then(response => {
          setSuccessNotificaiton(`Updated ${updatedExistingPerson.name}'s phone number to ${updatedExistingPerson.number}`)
          setPersons(persons.map(person => person.id !== response.data.id ? person : updatedExistingPerson));
          setFilteredPersons(filteredPersons.map(person => person.id !== response.data.id ? person : updatedExistingPerson))
          clearPersonForm();
        }).catch(() => {
          updateStateForRemovedPerson(existingPerson.id, updatedExistingPerson.name)
        })

    } else {
      personService
        .create(newPersonObj)
        .then(response => {
          setSuccessNotificaiton(`Updated ${newPersonObj.name}'s phone number to ${newPersonObj.number}`)
          setPersons(persons.concat(response.data));
          updateFilteredPersons(response.data)
          clearPersonForm();
        })
    }
  }

  const clearPersonForm = () => {
    setNewName('');
    setNewNumber('');
  }

  const isExistingPerson = (name) => {
    const isDuplicate = !!persons.find(person => person.name === name
    )
    return isDuplicate ? true : false;
  }

  const handleNameChange = (event) => setNewName(event.target.value)
  const handleNewNumber = (event) => setNewNumber(event.target.value)
  const handleNewFilter = (event) => {
    const filterText = event.target.value;
    handleFilteredPersons(filterText, persons)
    return setNewFilter(filterText)
  }

  const handleFilteredPersons = (existingFilterText, existingPersons = persons) => {
    const newFilterText = existingFilterText ?? newFilter;
    const newFilteredPersons = existingPersons.filter(person => person.name.toLocaleLowerCase().match(newFilterText.toLocaleLowerCase()))
    setFilteredPersons(newFilteredPersons);
  }

  const updateFilteredPersons = (newPerson) => {
    const isShown = newPerson.name.toLocaleLowerCase().match(newFilter.toLocaleLowerCase());
    isShown ? setFilteredPersons(filteredPersons.concat(newPerson)) : null;
  }

  const handlePersonDelete = (person) => {
    const { name, id } = person
    if (!window.confirm(`Delete ${name} ?`)) return

    personService.deleteOne(id)
      .then(() => {
        setSuccessNotificaiton(`${name} was successfully removed`)
        setPersons(persons.filter(person => person.id !== id))
        setFilteredPersons(filteredPersons.filter(filteredPerson => filteredPerson.id !== id))
      }).catch(error => {
        updateStateForRemovedPerson(id, name)
      })
  }

  const updateStateForRemovedPerson = (id, name) => {
    setErrorNotification(`${name} has already been removed from the server`);
    setPersons(persons.filter(person => person.id !== id))
    setFilteredPersons(filteredPersons.filter(filteredPerson => filteredPerson.id !== id))
  }

  const setSuccessNotificaiton = (message, timeout = 5000) => {
    setNotification(
      {
        message: message,
        type: MESSAGE_TYPES.success
      }
    )
    setTimeout(() => {
      setNotification(null)
    }, timeout);
  }

  const setErrorNotification = (message, timeout = 5000) => {
    setNotification(
      {
        message: message,
        type: MESSAGE_TYPES.error
      }
    )
    setTimeout(() => {
      setNotification(null)
    }, timeout);
  }

  return (
    <div>
      <h2>Phonebook</h2>
      <Notification notification={notification} />
      <Filter newFilter={newFilter} handleNewFilter={handleNewFilter} />
      <h2>add a new</h2>
      <PersonForm addName={addName} newName={newName} handleNameChange={handleNameChange} newNumber={newNumber} handleNewNumber={handleNewNumber} />
      <h2>Numbers</h2>
      <Persons filteredPersons={filteredPersons} handleDelete={handlePersonDelete} />
    </div>
  )
}

export default App