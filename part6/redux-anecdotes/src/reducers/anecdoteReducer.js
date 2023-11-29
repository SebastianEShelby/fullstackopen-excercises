import { createSlice } from '@reduxjs/toolkit'

const generateId = () => (100000 * Math.random()).toFixed(0)

const asObject = (anecdote) => {
  return {
    content: anecdote,
    id: generateId(),
    votes: 0
  }
}

const initialState = []

const anecdoteSlice = createSlice({
  name: 'anecdote',
  initialState,
  reducers: {
    createAnecdote(state, action) {
      const anecdoteObj = asObject(action.payload)
      return [...state, anecdoteObj]
    },
    voteForAnecdote(state, action) {
      return state.map(anecdoteObj => anecdoteObj.id === action.payload ? {
        ...anecdoteObj,
        votes: anecdoteObj.votes + 1
      } : anecdoteObj)
    },
    setAnecdotes(state, action) {
      return action.payload
    }
  }
})

export default anecdoteSlice.reducer
export const { createAnecdote, voteForAnecdote, setAnecdotes } = anecdoteSlice.actions