import { useSelector, useDispatch } from 'react-redux'
import { voteForAnecdote } from '../reducers/anecdoteReducer'
import { sendNotification } from '../reducers/notificationReducer'

const AnecdoteList = () => {

  const anecdotes = useSelector(state => state.anecdotes)
  const filter = useSelector(state => state.filter)
  const dispatch = useDispatch()

  const vote = (anecdote) => {
    dispatch(voteForAnecdote(anecdote.id, { ...anecdote, votes: anecdote.votes + 1 }))
    const notificationText = `You voted "${anecdote.content}"`
    dispatch(sendNotification(notificationText, 10))
  }

  const sortedAnecdotes = (anecdotes) => {
    if (!anecdotes || anecdotes.length < 1) return []
    return anecdotes.sort((a, b) => b.votes - a.votes)
  }

  const filteredAnecdotes = (anecdotes, filter) => {
    if (!anecdotes || anecdotes.length < 1) return []
    // cannot return immutable state object for sort
    if (!filter) return anecdotes.slice()
    return anecdotes.filter(anecdote => anecdote.content.toLocaleLowerCase().match(filter.toLocaleLowerCase()))
  }

  const displayedAnecdotes = sortedAnecdotes(filteredAnecdotes(anecdotes, filter))

  return (
    <>
      {displayedAnecdotes.map(anecdote =>
        <div key={anecdote.id}>
          <div>
            {anecdote.content}
          </div>
          <div>
            has {anecdote.votes}
            <button onClick={() => vote(anecdote)}>vote</button>
          </div>
        </div>
      )}
    </>
  )
}

export default AnecdoteList