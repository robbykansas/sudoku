import axios from 'axios'

const encodeBoard = (board) => board.reduce((result, row, i) => result + `%5B${encodeURIComponent(row)}%5D${i === board.length -1 ? '' : '%2C'}`, '')

const encodeParams = (params) => 
  Object.keys(params)
  .map(key => key + '=' + `%5B${encodeBoard(params[key])}%5D`)
  .join('&');

export function solver(data) {
  return (dispatch) => {
    axios({
      url: 'https://sugoku.herokuapp.com/solve',
      method: 'POST',
      data: encodeParams(data)
    })
      .then(response => {
        let solveData = {
          board: response.data.solution
        }
        dispatch({
          type: "board/setBoard",
          board: solveData
        })
      })
      .catch(e => console.log(e))
  }
}  

export function validate(data) {
  return (dispatch) => {
    axios({
      url: 'https://sugoku.herokuapp.com/validate',
      method: 'POST',
      data: encodeParams(data)
    })
      .then(response => {
        dispatch({
          type: "status/setStatus",
          status: response.data
        })
      })
      .catch(e => console.log(e))
  }
}

export function resetStatus() {
  return (dispatch) => {
    dispatch({
      type: 'status/setStatus',
      status: null
    })
  }
}

export function dataPlayer(name, difficulty) {
  return (dispatch) => {
    dispatch({
      type: 'name/setName',
      name
    })
    dispatch({
      type: 'difficulty/setDifficulty',
      difficulty
    })
  }
}

export function updateBoard(board, value, index, sIndex) {
  return (dispatch) => {
    let newBoard = JSON.parse(JSON.stringify(board.board))
    newBoard[index][sIndex] = Number(value)
    let newData = {
      board: newBoard
    }

    dispatch({
      type: "board/setBoard",
      board: newData
    })
  }
}

export function fetchBoard(difficulty) {
  return (dispatch) => {
    dispatch({
      type: "loading/setLoading",
      loading: true
    })
    axios({
      url: `https://sugoku.herokuapp.com/board?difficulty=${difficulty}`,
      method: 'GET'
    })
      .then(response => {
        dispatch({
          type: "board/setBoard",
          board: response.data
        })
        dispatch({
          type: "dummy/setDummy",
          dummy: response.data
        })
        dispatch({
          type: "loading/setLoading",
          loading: false
        })
      })
      .catch(e => {
        dispatch({
          type: "error/setError",
          error: e
        })
      })
  }
}