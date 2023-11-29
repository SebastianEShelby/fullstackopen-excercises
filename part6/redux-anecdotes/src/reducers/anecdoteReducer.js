import { createSlice } from '@reduxjs/toolkit'

const initialState = []

const anecdoteSlice = createSlice({
  name: 'anecdote',
  initialState,
  reducers: {
    createAnecdote(state, action) {
      return [...state, action.payload]
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