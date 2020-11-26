import React, {createContext, useReducer} from 'react'
import bookReducer from './store/Book'

export const AppContext = createContext()

const {Provider} = AppContext


function Store (props) {
  const {book, addBookCountAction, addBookAction} = bookReducer()
  
  console.log('addBookCountAction -> ', addBookCountAction)
  console.log('addBookAction -> ', addBookAction)
  
  return (
    <Provider value={{books: book, addAction: addBookCountAction, addBookAction}}>
      {props.children}
    </Provider>
  )
  
}

export default Store
