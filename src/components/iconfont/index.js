import React from 'react'
import './iconfont.css'
import './iconfont.js'
import './index.css'

class Iconfont extends React.PureComponent {
  render () {
    const { cls = '', style = {}, className = '' } = this.props
    const clickFun = this.props.onClick || null
    return (
      <svg className={`icon ${className}`} aria-hidden="true"  style={style} onClick={clickFun} > 
        <use xlinkHref={`#${cls}`}></use>
      </svg>
    )
  }
}

export default Iconfont
