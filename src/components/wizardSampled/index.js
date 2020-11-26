import React, {useState} from "react"
import _ from "lodash"
import {HashRouter as Router, Route, Link} from "react-router-dom"
import {Button, Steps, Form, Modal} from "antd"
import Step1 from "./Step1"
import Step2 from "./Step2"
import Step3 from "./Step3"

// 'antd'步骤
function Index (props) {
  const [allValues, setAllValues] = useState()
  
  const pushUrl = (path) => {
    window.history.pushState(null, "", `/#${path}`)
    console.log('props------', props)
    // props.forceUpdate()
    // forceUpdate()
  }
  
  const handleNext = () => {
    setAllValues((c)=>({
      ...c,
      ...props.form.getFieldValue()
    }))
    
    const currentStep = getCurrentStep()
    if (currentStep < getSteps().length - 1) {
      pushUrl(getSteps()[currentStep + 1].path)
    } else {
      Modal.success({
        title: "提交成功",
      })
    }
  }
  
  const handleBack = () => {
    console.log("form values: ", props.form.getFieldsValue())
    setAllValues((c)=>({
      ...c,
      ...props.form.getFieldValue()
    }))
  
    const currentStep = getCurrentStep()
    if (currentStep < getSteps().length - 1) {
      pushUrl(getSteps()[currentStep - 1].path)
    }
  }
  
  const getCurrentStep = () => {
    const currentPath = document.location.hash.replace(/^#/, "")
    return _.findIndex(getSteps(), {path: currentPath})
  }
  
  const getSteps = () => {
    return [
      {title: "验证邮件", path: "/wizard/step/1", component: Step1},
      {title: "账号信息", path: "/wizard/step/2", component: Step2},
      {title: "完成", path: "/wizard/step/3", component: Step3},
    ]
  }
  
  const renderComponent = () => {
    const StepComponent = getSteps()[getCurrentStep()].component
    return (
      <StepComponent form={props.form} allValues={allValues}/>
    )
  }
  
  return (
    <Router>
      <Form>
        <div style={{width: "600px", margin: '50px auto'}}>
          <h1>创建账号</h1>
          <Steps current={getCurrentStep()}>
            {getSteps().map(step => <Steps.Step title={step.title}/>)}
          </Steps>
          
          <div className="step-container" style={{margin: "40px 0"}}>
            <Route
              path="/wizard/step/:stepId"
              render={renderComponent}
            />
          </div>
          <div>
            <Button
              disabled={getCurrentStep() === 0}
              onClick={handleBack}
              style={{marginRight: "20px"}}
            >
              上一步
            </Button>
            
            <Button onClick={handleNext} type="primary">
              {getCurrentStep() === getSteps().length - 1
                ? "完成"
                : "下一步"}
            </Button>
          </div>
        </div>
      </Form>
    </Router>
  )
}

export default Form.create()(Index)
