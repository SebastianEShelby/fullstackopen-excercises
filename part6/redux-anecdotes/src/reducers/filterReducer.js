import { createSlice } from '@reduxjs/toolkit'

const initialState = ''

const filterSlice = createSlice({
  name: 'filter',
  initialState,
  reducers: {
    filterByText(state, action) {
      return action.payload
    }
  }
})

export default filterSlice.reducer
export const { filterByText } = filterSlice.actions