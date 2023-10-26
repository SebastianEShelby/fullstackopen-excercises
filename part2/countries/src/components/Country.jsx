export const Country = ({ country }) => {

  return (
    <>
      <h1>{country.name.common}</h1>
      <p>capital {country.capital[0]}</p>
      <p>area {country.area}</p>
      <br />
      <b>language(s):</b>
      <ul>
        {Object.entries(country.languages).map(([key, value]) => {
          return <li key={key}>{value}</li>
        })}
      </ul>
      <img style={{ width: 200, height: 200 }} src={country.flags.svg} alt={country.flags.alt} />
    </>
  )
}