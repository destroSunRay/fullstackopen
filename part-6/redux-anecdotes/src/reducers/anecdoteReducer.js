import { createSlice } from "@reduxjs/toolkit"
import anecdoteService from '../services/anecdotes'

const initialState = []


const anecdoteSlice = createSlice({
  name: 'anecdotes',
  initialState,
  reducers: {
    appendAnecdote: (state, action) => {
      state.push(action.payload)
    },
    increaseVoteOfAnecdote: (state, action) => {
      const id = action.payload
      const anecdoteToChange = state.find(n => n.id === id)
      anecdoteToChange.votes++
      return state.sort((a, b) => b.votes - a.votes)
    },
    setAnecdotes: (state, action) => {
      return action.payload?.sort((a, b) => b.votes - a.votes)
    }
  }
})

export const { appendAnecdote, increaseVoteOfAnecdote, setAnecdotes } = anecdoteSlice.actions

export const initializeAnecdotes = () => {
  return async dispatch => {
    const anecdotes = await anecdoteService.getAll()
    dispatch(setAnecdotes(anecdotes))
  }
}

export const createAnecdote = (content) => {
  return async dispatch => {
    const newAnecdote = await anecdoteService.createNew({ content, votes: 0 });
    dispatch(appendAnecdote(newAnecdote))
  }
}

export const voteAnecdote = id => {
  return async (dispatch, getState) => {
    const state = getState()
    const { votes, content } = state.anecdotes.find(n => n.id === id)
    await anecdoteService.update(id, { content, votes: votes + 1 })
    dispatch(increaseVoteOfAnecdote(id))
  }
}

export default anecdoteSlice.reducer