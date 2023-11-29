const anecdotesAtStart = [
  'If it hurts, do it more often',
  'Adding manpower to a late software project makes it later!',
  'The first 90 percent of the code accounts for the first 90 percent of the development time...The remaining 10 percent of the code accounts for the other 90 percent of the development time.',
  'Any fool can write code that a computer can understand. Good programmers write code that humans can understand.',
  'Premature optimization is the root of all evil.',
  'Debugging is twice as hard as writing the code in the first place. Therefore, if you write the code as cleverly as possible, you are, by definition, not smart enough to debug it.'
]

const generateId = () => (100000 * Math.random()).toFixed(0)

const asObject = (anecdote) => {
  return {
    content: anecdote,
    id: generateId(),
    votes: 0
  }
}

const initialState = anecdotesAtStart.map(asObject)

const reducer = (state = initialState, action) => {
  console.log('state now: ', state)
  console.log('action', action)
  if (action.payload)
    console.log('action.payload', action.payload)

  switch (action.type) {
    case 'VOTE':
      return state.map(anecdoteObj => anecdoteObj.id === action.payload.anecdoteId ? {
        ...anecdoteObj,
        votes: anecdoteObj.votes + 1
      } : anecdoteObj)
    case 'CREATE':
      return [...state, action.payload]
    default:
      return state
  }
}

export const voteForAnecdote = (anecdoteId) => {
  return {
    type: 'VOTE',
    payload: { anecdoteId }
  }
}

export const createAnecdote = (anecdote) => {
  return {
    type: 'CREATE',
    payload: asObject(anecdote)
  }
}

export default reducer