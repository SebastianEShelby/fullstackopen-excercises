import { useState } from 'react'

const Button = ({ feedback }) => {
  return (
    <button onClick={feedback.onClick}>
      {feedback.text}
    </button>
  )
}

const Feedback = ({ feedbacks }) => {
  return (
    <>
      <h1>give feedback</h1>
      <Button feedback={feedbacks[0]} />
      <Button feedback={feedbacks[1]} />
      <Button feedback={feedbacks[2]} />
    </>
  )
}

const Statistics = ({ good, neutral, bad }) => {
  return (
    <>
      <h1>statistics</h1>
      <p>good {good}</p>
      <p>neutral {neutral}</p>
      <p>bad {bad}</p>
    </>
  )
}

const App = () => {
  // save clicks of each button to its own state
  const [good, setGood] = useState(0)
  const [neutral, setNeutral] = useState(0)
  const [bad, setBad] = useState(0)

  const setFeedback = (feedback = 'neutral') => {
    switch (feedback) {
      case 'good': return setGood(good + 1)
      case 'bad': return setBad(bad + 1)
      default: return setNeutral(neutral + 1)
    }
  }

  const feedbacks = [
    { text: 'good', onClick: () => setFeedback('good') },
    { text: 'neutral', onClick: () => setFeedback('neutral') },
    { text: 'bad', onClick: () => setFeedback('bad') }
  ]




  return (
    <div>
      <Feedback feedbacks={feedbacks} />
      <Statistics good={good} neutral={neutral} bad={bad} />
    </div>
  )
}

export default App