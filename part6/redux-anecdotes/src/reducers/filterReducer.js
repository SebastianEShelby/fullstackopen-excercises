const initialState = ''

const filterReducer = (state = initialState, action) => {
  switch (action.type) {
    case 'FILTER':
      return action.payload.filterText
    default:
      return state
  }
}


export const filterByText = (filterText) => {
  return {
    type: 'FILTER',
    payload: { filterText }
  }
}

export default filterReducer