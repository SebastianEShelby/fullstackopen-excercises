import AnecdoteForm from './components/AnecdoteForm'
import Notification from './components/Notification'
import { useQuery } from '@tanstack/react-query'
import anecdotesService from './services/anecdotes'

const App = () => {

  const { isPending, isError, data, error } = useQuery({
    queryKey: ['anecdotes'],
    queryFn: anecdotesService.getAll,
    refetchOnWindowFocus: false
  })

  if (isPending) {
    return <div>loading data...</div>
  }
  if (isError) {
    console.log('App useQuery error', error);
    return <div>Anecdote service not available due to problems in the server</div>
  }
  const anecdotes = data

  const handleVote = (anecdote) => {
    console.log('vote')
  }

  return (
    <div>
      <h3>Anecdote app</h3>

      <Notification />
      <AnecdoteForm />

      {anecdotes.map(anecdote =>
        <div key={anecdote.id}>
          <div>
            {anecdote.content}
          </div>
          <div>
            has {anecdote.votes}
            <button onClick={() => handleVote(anecdote)}>vote</button>
          </div>
        </div>
      )}
    </div>
  )
}

export default App
