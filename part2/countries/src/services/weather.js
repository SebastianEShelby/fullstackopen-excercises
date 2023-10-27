import axios from "axios"

const apiKey = import.meta.env.VITE_OPEN_WEATHER_API_KEY
const baseUrl = 'https://api.openweathermap.org/data/2.5'
const weatherUnit = 'metric'
export const WEATHER_ICON_BASE_URL = 'https://openweathermap.org/img/wn'

const getOne = (lat, lon) => axios.get(`${baseUrl}/weather?lat=${lat}&lon=${lon}&appid=${apiKey}&units=${weatherUnit}`)

export default { getOne }