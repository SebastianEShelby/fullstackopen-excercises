// Component names must be capitalized
const Hello = (props) => {
  console.log(props)
  return (
    <div>
      <p>Hello {props.name}, you are {props.age} years old</p>
    </div>
  )
}

const App = () => {
  const name = 'Peter'
  const age = 10

  return (
    // Adjacent JSX elements must be wrapped in an enclosing tag. Here we use a "fragment" to wrap the adjacent elements. We could also return an array of html elements instead
    <>
      <h1>Greetings</h1>
      {/* ALL html tags in JSX must close. */}
      <br />
      <Hello name='Maya' age={26+10}/>
      <Hello name={name} age={age}/>
    </>
  )
}

export default App;
