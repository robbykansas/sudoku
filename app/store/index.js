import { createStore, applyMiddleware } from 'redux'
import thunk from 'redux-thunk'

const initialState = {
  dummy: [],
  board: [],
  loading: true,
  error: null,
  status: null,
  name: null,
  difficulty: null
}

function reducer( state = initialState, action ){
  switch(action.type) {
    case "loading/setLoading":
      return { ...state, loading: action.loading }
    case "error/setError":
      return { ...state, error: action.error }
    case "dummy/setDummy":
      return { ...state, dummy: action.dummy }
    case "board/setBoard":
      return { ...state, board: action.board }
    case "status/setStatus":
      return { ...state, status: action.status }
    case "name/setName":
      return { ...state, name: action.name }
    case "difficulty/setDifficulty":
      return { ...state, difficulty: action.difficulty }
    default:
      return state
  }
}

const store = createStore(reducer, applyMiddleware(thunk))

export default store