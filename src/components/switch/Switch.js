import React from 'react'
import './Switch.css'

const Switch = ({isOn, handleToggle}) => {
  return (
    <>
      <input
        checked={isOn}
        onClick={handleToggle}
        className="switch_checkbox"
        id={`react-switch-new`}
        type="checkbox"
      />
      <label
        style={{background: isOn && '#06D6A0'}}
        className="switch_label"
        htmlFor={`react-switch-new`}
      >
        <span className={`switch_button`}/>
      </label>
    </>
  )
}

export default Switch