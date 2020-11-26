import React, {useState, useContext} from "react"
import {AppContext} from "../store.js"

function Add () {
  const [name, setName] = useState("")
  const {addBookAction} = useContext(AppContext) // 把addBookAction映射进来
  return (
    <ul>
      <li>
        <input value={name} onChange={e => setName(e.target.value)} type="text"/>
      </li>
      <li>
        <button
          onClick={() => {
            addBookAction({
              id: Date.now(),
              name
            })
  
            setName('')
          }
          }
        >
          添加
        </button>
      </li>
    </ul>
  )
}

export default Add
