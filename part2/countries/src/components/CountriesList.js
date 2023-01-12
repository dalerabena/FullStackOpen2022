import { useState, useEffect } from 'react'
import axios from 'axios'

const Weather = ({ country }) => {
  const [countryWeather, setCountryWeather] = useState({})

  const api_key = process.env.REACT_APP_API_KEY

  useEffect(() => {
    axios
      .get('https://api.openweathermap.org/data/2.5/weather?', {
        params: {
          q: country,
          units: 'metric',
          appid: api_key
        }
      })
      .then(response => {
        const w = {
          temp: response.data.main.temp,
          icon: 'http://openweathermap.org/img/wn/'+ response.data.weather[0].icon +'@2x.png',
          wind: response.data.wind.speed
        }
        setCountryWeather(w)
      })
  }, [])
  
  return (
    <div>
      <h3>weather in {country}</h3>
      <div>temperature {countryWeather.temp} Celsius</div>
      <div>
        <img src={countryWeather.icon} />
      </div>
      <div>wind {countryWeather.wind} m/s</div>
    </div>
  )
}

const CountriesList = ({ countries, viewCountry }) => {
  
  if (countries.length > 10) {

    return (
      <div>too many matches, specify another filter</div>
    )

  } else if (countries.length > 1) {

    return (
      <div>
        {countries.map(country => {
          return (
            <div key={country.cca3}>
              {country.name.common} <button onClick={viewCountry(country.name.common)}>show</button>
            </div>
          )
        })}
      </div>
    )

  } else if (countries.length === 1) {
    
    const country = countries[0]    
    const languages = Object.entries(country.languages)
    const flags = Object.values(country.flags)    

    return (
      <div>
        <h2>{country.name.common}</h2>
        <div>capital {country.capital[0]}</div>
        <div>area {country.area}</div>

        <h3>languages:</h3>
        <ul>
          {languages.map(language => <li key={language[0]}>{language[1]}</li>)}
        </ul>

        <img src={flags[0]} width='150px' />

        <Weather country={country.name.common} />
      </div>
    )

  } else {

    return (
      <div></div>
    )

  }
}

export default CountriesList