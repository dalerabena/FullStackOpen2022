import { useState, useEffect } from 'react'
import axios from 'axios'
import CountriesList from './components/CountriesList'

const App = () => {
  const [countries, setCountries] = useState([]) 
  const [findCountry, setFindCountry] = useState('')
  const [filteredCountry, setFilteredCountry] = useState([])

  useEffect(() => {
    axios
      .get('https://restcountries.com/v3.1/all')
      .then(response => {
        setCountries(response.data)
        setFilteredCountry(response.data)
      })
  }, [])

  const handleCountryChange = (event) => {
    event.preventDefault()
    setFindCountry(event.target.value)

    const filtered = countries.filter(country => country.name.common.toUpperCase().match(event.target.value.toUpperCase()))
     setFilteredCountry(filtered)
  }

  const handleViewCountry = (value) => {
    return () => {
      const filtered = countries.filter(country => country.name.common.toUpperCase().match(value.toUpperCase()))
      setFilteredCountry(filtered)
    }
  }

  return (
    <div>
      <label>find countries </label>
      <input onChange={handleCountryChange} value={findCountry} />
      <CountriesList countries={filteredCountry} viewCountry={handleViewCountry} />
    </div>
  )
}

export default App