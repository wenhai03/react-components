import React, { useState, useEffect, forwardRef } from 'react'
import { Cascader } from 'antd'
// import { request } from 'apiRequest'
// import areaData from '../../config/areaData/areaData'

function Address ({ value, onChange, localDataOrigin = false }) {
  console.log(value)
  const [options, setOptions] = useState([])
  /*const getData = async () => {
    let data = await request.getProvince()
    data = data.map(n => ({
      label: n.cityname,
      value: n.id,
      isLeaf: false,
    }))
    setOptions(data)
  }*/
  
  useEffect(() => {
    if (!localDataOrigin) {
      // getData()
    }
  }, [localDataOrigin])
  
  const handleChange = (value, selectedOptions) => {
    console.log(value, selectedOptions)
    const areaName = selectedOptions.map(n => n.label).join('')
    onChange && onChange({ areaId: value, areaName })
  }
  
  const loadData = async selectedOptions => {
    /*const targetOption = selectedOptions[selectedOptions.length - 1]
    targetOption.loading = true
    const data = await request.getCityById({ cityId: targetOption.value })
    if (data.length === 0) {
      targetOption.isLeaf = true
    } else {
      targetOption.children = data.map(n => ({
        label: n.cityname,
        value: n.id,
        isLeaf: n.type === 3 ? true : false,
      }))
    }
    targetOption.loading = false
    setOptions(option => [...option])*/
  }
  
  return (
    <Cascader
      // options={localDataOrigin ? areaData : options}
      loadData={loadData}
      onChange={handleChange}
      changeOnSelect
      placeholder="请选择地区"
      style={{ width: '100%' }}
      value={value && value.areaId || []}
    />
  )
}

export default forwardRef((props, ref) => {
  return <Address {...props} forwardedRef={ref} />
})
