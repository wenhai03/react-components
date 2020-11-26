import React, { } from 'react'
import PropTypes from 'prop-types'
import { Col, Form, Icon, Row, Tooltip } from 'antd'

const FormItem = Form.Item

const defaultFormItemLayout = {labelCol: { span: 6 }, wrapperCol: { span: 16 }}

function pickProps (source, props) {
  const target = {}
  props.forEach(prop => {
    if (prop in source) target[prop] = source[prop]
  })
  return target
}

function FormBuilder (props) {
  const getMeta = () => {
    const { meta } = props
    console.log('meta------', meta)
    return meta.elements ? meta : { elements: [meta] }
  }
  
  const renderElement = (element) => {
    const meta = getMeta()
    const label = element.tooltip ? (
      <span>
        {element.label}
        <Tooltip title={element.tooltip}>
          {' '}
          {element.icon && <Icon type={element.icon} />}
        </Tooltip>
      </span>
    ) : (
      element.label
    )
    const formItemProps = {
      key: element.key,
      colon: meta.colon,
      ...(meta.formItemLayout || (element.label ? defaultFormItemLayout : null)),
      label,
      ...pickProps(element, ['help', 'extra', 'labelCol', 'wrapperCol', 'colon', 'hasFeedback', 'validateStatus', 'hasFeedback']),
      ...element.formItemProps,
    }
    
    if (element.render) {
      const { disabled } = props
      return element.render.call(this, {
        formItemProps,
        element,
        disabled,
      })
    }
    
    // Handle field props
    let rules = element.rules || []
    if (element.required) {
      rules = [
        ...rules,
        {
          required: true,
          message: `${element.label || element.key} `,
        },
      ]
    }
    const fieldProps = {
      ...pickProps(element, ['getValueFromEvent', 'initialValue', 'normalize', 'trigger', 'valuePropName', 'validateTrigger', 'validateFirst']),
      rules,
      ...element.fieldProps,
    }
    
    // Handle widget props
    const wp = element.widgetProps || {}
    const { disabled } = props
    const widgetProps = {
      ...pickProps(element, ['placeholder', 'type', 'className', 'class']),
      ...wp,
      disabled: element.disabled || wp.disabled || disabled,
    }
    const icon = widgetProps.addonAfter ? widgetProps.addonAfter : ''
    // console.log('widgetProps------', widgetProps.addonAfter)
    
    if (!element.id) {
      // widgetProps.id = formItemProps.id = getId();
    }
    
    const {
      form: { getFieldDecorator },
    } = props
    return (
      <FormItem {...formItemProps}>
        {getFieldDecorator(element.id || element.key, fieldProps)(
          <element.widget placeholder={`请输入${element.label}`} {...widgetProps} addonAfter={icon}>
            {element.children || null}
          </element.widget>
        )}
      </FormItem>
    )
  }
  
  const renderLayout = (elements) => {
    // Layout the form in columns
    const { meta } = props
    const columns = meta.columns || 1
    if (columns === 1) return elements
    const gutter = meta.gutter || 0
    const rows = []
    const colspan = 24 / columns
    for (let i = 0; i < elements.length; i += columns) {
      const cols = []
      for (let j = 0; j < columns; j += 1) {
        cols.push(
          <Col key={j} span={colspan.toString()}>
            {elements[i + j]}
          </Col>
        )
      }
      rows.push(
        <Row key={i} gutter={gutter}>
          {cols}
        </Row>
      )
    }
    return rows
  }
  
  
  return renderLayout(getMeta().elements.map(renderElement))
}

FormBuilder.propTypes = {
  meta: PropTypes.object.isRequired,
  form: PropTypes.object.isRequired,
  disabled: PropTypes.bool,
}

export default FormBuilder
