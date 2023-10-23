import { useState } from 'react'

const App = () => {
  const [persons, setPersons] = useState([
    { name: 'Arto Hellas', number: '416-111-2222' }
  ])
  const [newName, setNewName] = useState('');
  const [newNumber, setNewNumber] = useState('')

  const addName = (event) => {
    event.preventDefault()
    if (isDuplicateName()) return alert(`${newName} is already added to phonebook`)
    const newPerson = { name: newName, number: newNumber }
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

  return (
    <div>
      <h2>Phonebook</h2>
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
      {persons.map(person => <p key={person.name}>{person.name} {person.number}</p>)}
    </div>
  )
}

export default App