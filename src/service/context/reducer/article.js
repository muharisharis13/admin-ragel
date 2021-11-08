export const reducer_article = function(state, action) {
  if (action.type === 'LOADING') {
    return {
      ...state,
      loading: action.loading
    }
  }
}