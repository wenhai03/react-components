import React, {useState, forwardRef} from "react"
import {Form, Input, Select, Button} from "antd"

const {Option} = Select

function PriceInput ({size, value = {}, onChange}, ref) {
  const [num, setNum] = useState(value.number || 0)
  const [currency, setCurrency] = useState(value.currency || "rmb")
  
  function triggerChange (changedValue) {
    if (onChange) {
      onChange(Object.assign({}, {number: num, currency}, changedValue))
    }
  }
  
  return (
    <span ref={ref}>
      <Input
        type="text"
        size={size}
        value={"number" in value ? value.number : num}
        onChange={({target: {value: val}}) => {
          const number = parseInt(val || 0, 10)
          if (Number.isNaN(number)) {
            return
          }
    
          setNum(val)
          triggerChange({number: val})
        }}
        style={{width: "65%", marginRight: "3%"}}
      />
      <Select
        value={"currency" in value ? value.currency : currency}
        size={size}
        style={{width: "32%"}}
        onChange={currency => {
          setCurrency(currency)
          triggerChange({currency})
        }}
      >
        <Option value="rmb">RMB</Option>
        <Option value="dollar">Dollar</Option>
      </Select>
    </span>
  )
}

PriceInput = forwardRef(PriceInput)

class Demo extends React.Component {
  handleSubmit = e => {
    e.preventDefault()
    this.props.form.validateFields((err, values) => {
      if (!err) {
        console.log("Received values of form: ", values)
      }
    })
  }
  
  checkPrice = (rule, value, callback) => {
    if (value.number > 0) {
      callback()
      return
    }
    callback("Price must greater than zero!")
  }
  
  render () {
    const {getFieldDecorator} = this.props.form
    return (
      <Form layout="inline" onSubmit={this.handleSubmit}>
        <Form.Item label="Price">
          {getFieldDecorator("price", {
            initialValue: {number: 0, currency: "rmb"},
            rules: [{validator: this.checkPrice}]
          })(<PriceInput/>)}
        </Form.Item>
        <Form.Item>
          <Button type="primary" htmlType="submit">
            Submit
          </Button>
        </Form.Item>
      </Form>
    )
  }
}

export default Form.create()(Demo)

