import { useState } from 'react'

const App = () => {
  const [persons, setPersons] = useState([
    { name: 'Arto Hellas', number: '040-123456', id: 1 },
    { name: 'Ada Lovelace', number: '39-44-5323523', id: 2 },
    { name: 'Dan Abramov', number: '12-43-234345', id: 3 },
    { name: 'Mary Poppendieck', number: '39-23-6423122', id: 4 }
  ])

  const [newName, setNewName] = useState('');
  const [newNumber, setNewNumber] = useState('');
  const [newFilter, setNewFilter] = useState('');
  const [filteredPersons, setFilteredPersons] = useState(persons);

  const addName = (event) => {
    event.preventDefault()
    if (isDuplicateName()) return alert(`${newName} is already added to phonebook`)
    const newPerson = { name: newName, number: newNumber, id: persons.length + 1 }
    setPersons(persons.concat(newPerson));
    setNewName('');
  }

  const isDuplicateName = () => {
    const isDuplicate = !!persons.find(person => person.name === newName
    )
    return isDuplicate ? true : false;
  }

  const handleNameChange = (event) => setNewName(event.target.value)
  const handleNewNumber = (event) => setNewNumber(event.target.value)
  const handleNewFilter = (event) => {
    const newFilter = event.target.value;
    const filteredPersons = persons.filter(person => person.name.toLocaleLowerCase().match(newFilter.toLocaleLowerCase()))
    setFilteredPersons(filteredPersons);
    return setNewFilter(newFilter)
  }

  return (
    <div>
      <h2>Phonebook</h2>
      <p>filter shown with <input value={newFilter} onChange={handleNewFilter} /></p>
      <h2>add a new</h2>
      <form onSubmit={addName}>
        <div>
          name: <input value={newName} onChange={handleNameChange} />
        </div>
        <div>number: <input value={newNumber} onChange={handleNewNumber} /></div>
        <div>
          <button type="submit">add</button>
        </div>
      </form>
      <h2>Numbers</h2>
      {filteredPersons.map(person => <p key={person.id}>{person.name} {person.number}</p>)}
    </div>
  )
}

export default App