import { useSelector, useDispatch } from 'react-redux'
import { voteForAnecdote } from '../reducers/anecdoteReducer'
import { sendNotification, hideNotification } from '../reducers/notificationReducer'

const AnecdoteList = () => {

  const anecdotes = useSelector(state => state.anecdotes)
  const filter = useSelector(state => state.filter)
  const dispatch = useDispatch()

  const vote = (anecdote) => {
    dispatch(voteForAnecdote(anecdote.id))
    const notificationText = `You voted "${anecdote.content}"`
    dispatch(sendNotification(notificationText))
    setTimeout(() => {
      dispatch(hideNotification())
    }, 5000)
  }

  const sortedAnecdotes = (anecdotes) => {
    return anecdotes.sort((a, b) => b.votes - a.votes)
  }

  const filteredAnecdotes = (anecdotes, filter) => {
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