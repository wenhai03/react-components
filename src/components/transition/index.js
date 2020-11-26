import React, {useState} from 'react'
import { CSSTransition } from "react-transition-group"
import { Container } from "./style"
// import { renderRoutes } from 'react-router-config'

function Index (props) {
  console.log('transition props------', props)
  const [showStatus, setShowStatus] = useState(true);
  return (
    <div>
      <CSSTransition
        in={showStatus}
        timeout={300}
        classNames="fly"
        appear={true}
        unmountOnExit
        onExited={() => props.history.goBack()}
      >
        <Container>
          <div>transition</div>
          <div>transition</div>
          <div>transition</div>
          <div>transition</div>
          <div>transition</div>
          <div>transition</div>
          <div>transition</div>
          <div>transition</div>
          <div>transition</div>
          <div>transition</div>
          <div>transition</div>
        </Container>
        {/*{renderRoutes(props.route.routes)}*/}
      </CSSTransition>
    </div>
    
  )
}

export default Index
