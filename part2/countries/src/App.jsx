import { useEffect, useState } from "react"
import CountryFilter from "./components/CountryFilter"
import countriesService from './services/countries'
import Countries from "./components/Countries"
import weatherService from './services/weather';

function App() {

  const [countryFilter, setCountryFilter] = useState('')
  const [countries, setCountries] = useState([])
  const [weather, setWeather] = useState(null)

  useEffect(() => {
    if (countries.length === 1) {
      const country = countries[0];
      const lat = country.latlng[0];
      const lng = country.latlng[1];
      weatherService
        .getOne(lat, lng)
        .then(response => {
          setWeather(response.data);
        })
    }
  }, [countries])

  useEffect(() => {
    countriesService
      .getAll()
      .then((response) => {
        const filteredCountries = response.data.filter(country => country.name.common.toLocaleLowerCase().match(countryFilter));
        setCountries(filteredCountries);
      })
  }, [countryFilter])

  const handleCountryFilter = (event) => {
    const filterText = event.target.value;
    setCountryFilter(filterText);
  }

  const handleCountryShow = (country) => {
    setCountries([country]);
  }

  return (
    <>
      <CountryFilter filter={countryFilter} handleFilter={handleCountryFilter} />
      <Countries countries={countries} weather={weather} handleClick={handleCountryShow} />
    </>
  )
}

export default App
