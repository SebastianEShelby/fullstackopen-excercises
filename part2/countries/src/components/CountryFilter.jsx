const CountryFilter = ({ filter, handleFilter }) => {
  return (
    <p>find countires <input value={filter} onChange={handleFilter} /></p>
  )
}

export default CountryFilter;