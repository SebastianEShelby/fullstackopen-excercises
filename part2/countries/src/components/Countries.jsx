import { Country } from "./Country";

export const Countries = ({ countries, handleClick }) => {

  if (!countries.length || countries.length === 0) return null;

  if (countries.length > 10) return <p>Too many matches, specify another filter</p>

  if (countries.length === 1)
    return (
      <Country country={countries[0]} />
    )

  return (
    countries.map(country => {
      return <p key={country.ccn3}>{country.name.common} <button onClick={() => handleClick(country)}>show</button></p>
    })
  )
}

export default Countries;