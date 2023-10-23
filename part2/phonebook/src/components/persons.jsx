const Persons = ({ filteredPersons, handleDelete }) => {
	return (
		<>
			{filteredPersons
				.map(person =>
					<p key={person.id}>
						<span >{person.name} {person.number}</span>
						&nbsp;
						<button onClick={() => handleDelete(person)}>delete</button>
					</p>
				)}
		</>
	)
}

export default Persons