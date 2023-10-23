import { useEffect, useState } from 'react'
import Filter from './components/filter';
import PersonForm from './components/person-form';
import Persons from './components/persons';
import axios from '../node_modules/axios/index';

const App = () => {
  const [persons, setPersons] = useState([])
  const [newName, setNewName] = useState('');
  const [newNumber, setNewNumber] = useState('');
  const [newFilter, setNewFilter] = useState('');
  const [filteredPersons, setFilteredPersons] = useState(persons);

  useEffect(() => {
    axios.get('http://localhost:3001/persons')
      .then(response => {
        console.log('response.data', response.data);
        setPersons(response.data)
        setFilteredPersons(response.data)
      })
  }, [])
  console.log('render', persons);

  const addName = (event) => {
    event.preventDefault()
    if (isDuplicateName()) return alert(`${newName} is already added to phonebook`)
    const newPerson = { name: newName, number: newNumber, id: persons.length + 1 }
    setPersons(persons.concat(newPerson));
    updateFilteredPersons(newPerson)
    setNewName('');
    setNewNumber('');
  }

  const isDuplicateName = () => {
    const isDuplicate = !!persons.find(person => person.name === newName
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

  return (
    <div>
      <h2>Phonebook</h2>
      <Filter newFilter={newFilter} handleNewFilter={handleNewFilter} />
      <h2>add a new</h2>
      <PersonForm addName={addName} newName={newName} handleNameChange={handleNameChange} newNumber={newNumber} handleNewNumber={handleNewNumber} />
      <h2>Numbers</h2>
      <Persons filteredPersons={filteredPersons} />
    </div>
  )
}

export default App