import { useState } from "react"

const App = () => {
  const [value, setValue] = useState(10)

  // Functions returning functions can be utilized in defining generic functionality that can be customized with parameters. The hello function that creates the event handlers can be thought of as a factory that produces customized event handlers meant for greeting users.
  const hello = (who) => {
    const handler = () => {
      console.log('hello', who)
    }

    return handler
  }

  return (
    <div>
      {value}

      <button onClick={hello('world')}>button</button>
      <button onClick={hello('react')}>button</button>
      <button onClick={hello('function')}>button</button>
    </div>
  )
}

export default App