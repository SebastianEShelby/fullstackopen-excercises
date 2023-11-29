import { useSelector, useDispatch } from 'react-redux'
import { voteForAnecdote } from './reducers/anecdoteReducer'
import AnecdoteForm from './components/AnecdoteForm'

const App = () => {
  const anecdotes = useSelector(state => state)
  const dispatch = useDispatch()

  const vote = (id) => {
    console.log('vote', id)
    dispatch(voteForAnecdote(id))
  }

  const sortedAnecdotes = (anecdotes) => {
    return anecdotes.sort((a, b) => b.votes - a.votes)
  }

  return (
    <div>
      <h2>Anecdotes</h2>
      {sortedAnecdotes(anecdotes).map(anecdote =>
        <div key={anecdote.id}>
          <div>
            {anecdote.content}
          </div>
          <div>
            has {anecdote.votes}
            <button onClick={() => vote(anecdote.id)}>vote</button>
          </div>
        </div>
      )}
      <AnecdoteForm />
    </div>
  )
}

export default App