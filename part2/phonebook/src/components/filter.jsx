const Filter = ({ newFilter, handleNewFilter }) => {
	return (
		<p>filter shown with <input value={newFilter} onChange={handleNewFilter} /></p>
	)
}

export default Filter