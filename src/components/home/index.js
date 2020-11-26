import React from 'react'
import { renderRoutes } from "react-router-config"

function Index (props) {
  console.log('home props', props)
  const { route } = props
  return (
    <>
    home
    <p onClick={() => {
      props.history.push('/transition')
    }}>跳转到 css transition</p>
  
      { renderRoutes(props.route.routes) }
    </>
  )
}

export default Index
