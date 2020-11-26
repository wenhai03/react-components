import React, {useState, useEffect} from 'react'
import "antd/dist/antd.css"
import _ from 'lodash'
import {Button, DatePicker, Form, Input, InputNumber, Select} from "antd"
import FormBuilder from "./formSubmitAntd"
import SingleUpload from "./singleUpload"

const Option = Select.Option

const genderOptions = [
  {value: "male", displayName: "Male"},
  {value: "female", displayName: "Female"}
].map(item => (
  <Option key={item.value} value={item.value}>
    {item.displayName}
  </Option>
))

const formMeta = {
  colon: true,
  columns: 1,
  elements: [
    {
      key: "img",
      label: "照片",
      initialValue: null,
      widget: SingleUpload,
      tooltip: "图片大小不能超过2M",
      icon: 'file-jpg',
      required: true
    },
    {
      key: "userName",
      label: "User name",
      tooltip: "user name",
      initialValue: "Nate",
      icon: 'file-jpg',
      widget: Input,
      required: true
    },
    // formatter + parser用InputNumber有带上 % 情况
    // precision 可以保留的小数位
    {
      key: "fee",
      label: "提币手续费",
      widget: InputNumber,
      widgetProps: {
        formatter: value => `${value}%`,
        parser: value => value.replace('%', ''),
        min: 0,
        max: 100,
        precision: 2,
        style: {width: '200px'},
      },
    },
    {
      key: "gender",
      label: "性别",
      initialValue: "female",
      widget: Select,
      children: genderOptions
    },
    {
      key: "title",
      label: "标题",
      required: true,
      widget: Input
    },
    {
      key: "phone",
      label: "手机号",
      widget: Input,
      required: true,
      rules: [
        {
          pattern: /^\d+$/,
          message: "手机号必须是数字"
        },
        {
          pattern: /^1[3456789]\d{9}$/,
          message: '请输入正确的手机号'
        },
        {
          min: 11,
          message: "手机号不能少于11位"
        }
      ]
    },
    {
      key: "province",
      label: "省份",
    },
    {
      key: "city",
      label: "城市",
    },
  ]
}

const App = (props) => {
  const [jobs, setJobs] = useState(null)
  const [userData, setUserData] = useState(null)
  const [userName, setUserName] = useState(null)
  const [provinces, setProvinces] = useState(null)
  const [cities, setCities] = useState(null)
  
  const handleSubmit = (evt) => {
    if (evt) evt.preventDefault()
    props.form.validateFieldsAndScroll((errors, values) => {
        if (errors) return
        
        console.log("Submit form: ", values)
      }
    )
  }
  
  const fetchProvices = () => {
    return new Promise(resolve => {
      setTimeout(() => {
        resolve([
          {name: "北京", key: "beijing"},
          {name: "上海", key: "shanghai"},
          {name: "江苏", key: "jiangsu"},
          {name: "山东", key: "shandong"},
        ])
      }, 1000)
    })
  }
  
  const fetchCities = province => {
    return new Promise(resolve => {
      setTimeout(() => {
        resolve(
          {
            beijing: [
              {name: "朝阳", key: "chaoyang"},
              {name: "海淀", key: "haidian"},
            ],
            shanghai: [
              {name: "浦东", key: "pudong"},
              {name: "徐汇", key: "xuhui"},
            ],
            jiangsu: [
              {name: "南京", key: "nanjing"},
              {name: "苏州", key: "suzhou"},
            ],
            shandong: [
              {name: "青岛", key: "qingdao"},
              {name: "德州", key: "dezhou"},
            ],
          }[province],
        )
      }, 1000)
    })
  }
  
  const fetchUserInfo = id => {
    return new Promise(resolve => {
      setTimeout(() => {
        resolve({
          userName: "Nate",
          province: "shanghai",
          city: "pudong",
        })
      }, 1000)
    })
  }
  
  useEffect(() => {
    fetchProvices().then(data => setProvinces(data))
    fetchUserInfo().then(data => {
      setUserData(data)
      fetchCities(data.province).then(cities => setCities(cities))
    })
  }, [])
  
  useEffect(() => {
    setTimeout(() => {
      const data = [
        "Software Engineer",
        "Student",
        "Doctor"
      ]
      props.form.setFieldsValue({
        gender: "Software Engineer"
      })
      setJobs(data)
    }, 2000)
  }, [])
  
  
  const getMeta = () => {
    return {
      ...formMeta,
      elements: _.compact(
        formMeta.elements.map(m => {
          // 这块通过模拟请求下拉列表的数据，
          if (m.key === "gender") {
            return {
              ...m,
              widget: Select,
              initialValue: "loading",
              children: jobs
                ? jobs.map(job => (
                  <Option key={job}>{job}</Option>
                ))
                : [
                  <Option key="loading">
                    Loading...
                  </Option>
                ]
            }
          }
          // 这块可以根据下拉选中的值，让其是否显示
          if (m.key === 'title' && props.form.getFieldValue('gender') !== 'Software Engineer') {
            return null
          }
          
          if (m.key === "province") {
            m = {
              ...m,
              widgetProps: {
                onChange: handleProvinceChange,
              },
            };
          }
          
          if (m.key === "province" || m.key === "city") {
            const values = m.key === "province" ? provinces : cities
            return {
              ...m,
              widget: Select,
              initialValue:
                values && userData && userData[m.key]
                  ? userData[m.key]
                  : "loading",
              children: values
                ? values.map(p => <Option key={p.key}>{p.name}</Option>)
                : [<Option key="loading">Loading...</Option>],
            }
          }
          return {
            ...m,
            initialValue: userData ? userData[m.key] : "",
          }
        })
      )
    }
  }
  
  const handleProvinceChange = newProvince => {
    setCities(null)
    fetchCities(newProvince).then(cities => {
        setCities(cities)
        setUserData((c) => ({...c, city: cities[0].key}))
        props.form.setFieldsValue({ city: cities[0].key })
      }
    ).then((cities) => {
    
    });
  }
  
  return (
    <div>
      <Form style={{width: 500, margin: '50px auto'}}>
        <FormBuilder
          meta={getMeta()}
          form={props.form}
        />
        <div style={{textAlign: "center"}}>
          <Button onClick={handleSubmit} type="primary">
            提交
          </Button>&nbsp; &nbsp;
          <Button onClick={() => {
            props.form.resetFields()
          }}>重置</Button>
        </div>
      </Form>
      
      <hr/>
    
    </div>
  )
}

export default Form.create()(App)