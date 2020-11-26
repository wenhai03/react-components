import React, {createContext, useReducer} from 'react'

export const AppContext = createContext()

const {Provider} = AppContext

function reducer(state, action) {
  switch (action.type) {
    case 'COUNT_ADD':
      return {...state, count: state.count +1}
    default:
      return state
  }
}

function Store (props) {
  const [books, dispatch] = useReducer(reducer, {
    list: [],
    count: 1
  })
  const addAction = () => {
     dispatch({
       type: "COUNT_ADD"
     })
  }
  
  return (
    <Provider value={{books, addAction}}>
      {props.children}
    </Provider>
  )
  
}

export default Store
