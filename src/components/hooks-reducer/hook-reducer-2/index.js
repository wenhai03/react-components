import React from 'react'
import ReactDOM from 'react-dom'
import './index.css'
import * as serviceWorker from './serviceWorker'
import Counter from './components/Counter'
import List from './components/List'
import Add from './components/Add'

import Store from './store.js'

ReactDOM.render(
  <Store>
      <h1>hello world</h1>
  
      <Counter />
      <List />
      <Add />
  </Store>,
  document.getElementById('root')
)

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister()
