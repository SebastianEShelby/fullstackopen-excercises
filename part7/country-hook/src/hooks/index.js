import { useState, useEffect } from 'react'
import countriesService from '../services/countries'

export const useField = (type) => {
  const [value, setValue] = useState('')

  const onChange = (event) => {
    setValue(event.target.value)
  }

  return {
    type,
    value,
    onChange
  }
}


export const useCountry = (name) => {
  const [country, setCountry] = useState(null)
  const [found, setFound] = useState(false)

  useEffect(() => {
    if (name) {
      countriesService.getOne(name)
        .then((res) => {
          const countryFound = {
            name: res.name.common,
            capital: res.capital[0],
            population: res.population,
            flag: res.flags.svg
          }
          setFound(true)
          setCountry(countryFound)
        }).catch(() => {
          setFound(false)
          setCountry(null)
        })
    }
  }, [name])

  return {
    found,
    data: country
  }
}