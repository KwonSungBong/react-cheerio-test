const request = require('superagent')

// ------------------------------------
// Constants
// ------------------------------------
export const GET_CRAWLING = 'GET_CRAWLING'
export const GET_CRAWLING_SUCCESS = 'GET_CRAWLING_SUCCESS'
export const GET_CRAWLING_FAIL = 'GET_CRAWLING_FAIL'

export const getCrawling = (term) => {
  return (dispatch, getState) => {
    return new Promise((resolve) => {
      dispatch({
        type : GET_CRAWLING
      })
      request
        .get('/api/test')
        .query({ term: term }) // query string
        .end(function(err, res){
          dispatch({
            type    : GET_CRAWLING_SUCCESS,
            text : res.text
          })
          resolve()
        })
    })
  }
}

export const actions = {
  getCrawling
}

// ------------------------------------
// Action Handlers
// ------------------------------------
const ACTION_HANDLERS = {
  [GET_CRAWLING]    : (state, action) => {return {...state, loading:true}},
  [GET_CRAWLING_SUCCESS] : (state, action) => {return {...state, text:JSON.stringify(action.text), loading:false}},
  [GET_CRAWLING_FAIL] : (state, action) => {return {...state, text:"error", loading:false}}
}

// ------------------------------------
// Reducer
// ------------------------------------
const initialState = {loading:false, text:''}
export default function crawlingReducer (state = initialState, action) {
  const handler = ACTION_HANDLERS[action.type]

  return handler ? handler(state, action) : state
}
