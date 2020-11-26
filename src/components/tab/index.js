import React, { useState } from 'react'
import './index.css'

function Index (props) {
  const [selectTab, setSelecttab] = useState(props.selectTab || '')
  const { options = [], style, onChange, cls, itemCls, activeCls, wrapStyle } = props
  
  const handleSelect = item => {
    setSelecttab(item.value)
    onChange && onChange(item)
  }
  
  const activeClass = activeCls ? activeCls : 'active'
  
  return (
    <div className={cls ? cls : 'tab_wrapper'} style={wrapStyle}>
      {options.map(item => (
        <span
          key={item.value}
          style={style}
          className={`${itemCls ? itemCls : 'tab_item'} ${
            item.value === selectTab ? activeClass : ''
          }`}
          onClick={() => handleSelect(item)}
        >
          {item.label}
        </span>
      ))}
    </div>
  )
}

export default Index
