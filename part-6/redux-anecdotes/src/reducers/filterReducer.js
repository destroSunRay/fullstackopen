const filterReducer = (state = '', action) => {
  switch (action.type) {
    case 'FILTER_ANECDOTES':
      if (action.payload.filterText) {
        return action.payload.filterText.toLowerCase();
      }
      return '';

    default:
      return state;
  }
}

export const filterAnecdotes = (filterText) => {
  return {
    type: 'FILTER_ANECDOTES',
    payload: { filterText }
  }
}


export default filterReducer;