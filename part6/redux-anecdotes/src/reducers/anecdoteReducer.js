import { createSlice } from '@reduxjs/toolkit'
import anecdoteService from '../services/anecdotes'

const initialState = []

const anecdoteSlice = createSlice({
  name: 'anecdote',
  initialState,
  reducers: {
    appendAnecdote(state, action) {
      return [...state, action.payload]
    },
    appendVotesForAnecdote(state, action) {
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
export const { appendAnecdote, appendVotesForAnecdote, setAnecdotes } = anecdoteSlice.actions
export const initializeAnecdotes = () => {
  return async dispatch => {
    const anecdotes = await anecdoteService.getAll()
    dispatch(setAnecdotes(anecdotes))
  }
}
export const createAnecdote = (content) => {
  return async dispatch => {
    const newAnecdote = await anecdoteService.createNew({ content, votes: 0 })
    dispatch(appendAnecdote(newAnecdote))
  }
}

export const voteForAnecdote = (id, anecdote) => {
  return async dispatch => {
    const updatedAnecdote = await anecdoteService.updateVotes(id, anecdote)
    dispatch(appendVotesForAnecdote(updatedAnecdote.id))
  }
}