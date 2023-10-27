import { WEATHER_ICON_BASE_URL } from "../services/weather";

export const Weather = ({ country, weather }) => {

  if (!country || !weather) return null;

  const weatherSrc = `${WEATHER_ICON_BASE_URL}/${weather.weather[0].icon}@2x.png`

  return (
    <>
      <h2>Weather in {country.name.common}</h2>
      <p>temperature {weather.main.temp} Celcius</p>
      <img src={weatherSrc} alt={weather.weather[0].main} />
      <p>wind {weather.wind.speed} m/s</p>
    </>
  )
}

export default Weather;