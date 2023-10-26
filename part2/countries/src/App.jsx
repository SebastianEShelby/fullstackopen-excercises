import { useState } from "react"
import CountryFilter from "./components/CountryFilter"
import countriesService from './services/countries'
import Countries from "./components/Countries"

function App() {

  const [countryFilter, setCountryFilter] = useState('')
  const [countries, setCountries] = useState([])

  const handleCountryFilter = (event) => {
    const filterText = event.target.value;
    setCountryFilter(filterText);

    countriesService
      .getAll()
      .then((response) => {
        const filteredCountries = response.data.filter(country => country.name.common.toLocaleLowerCase().match(filterText));
        setCountries(filteredCountries);
      })
  }

  return (
    <>
      <CountryFilter filter={countryFilter} handleFilter={handleCountryFilter} />
      <Countries countries={countries} />
    </>
  )
}

export default App
