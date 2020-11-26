import React from 'react'
import styles from './index.scss'

function Load ({ txt = "努力加载中..." }) {
  return <div className="load_wrap">
    <div className="load_container">
      <div className="boxLoading"></div>
    </div>
    <p className="load_txt">{txt}</p>
  </div>
}

export default Load
