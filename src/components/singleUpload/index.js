import React, { useState, useEffect } from 'react'
import { message, Icon, Upload } from 'antd'
// import apiConfig from 'apiConfig'
// const { apiPrefix } = apiConfig
// const apiPrefix = 'http://47.56.11.120:5806/'

function beforeUpload (file) {
  const isJpgOrPng = file.type === 'image/jpeg' || file.type === 'image/png'
  if (!isJpgOrPng) {
    message.error('请选择正确的图片')
  }
  const isLt2M = file.size / 1024 / 1024 < 2
  if (!isLt2M) {
    message.error('图片大小不能超过2M')
  }
  return isJpgOrPng && isLt2M
}

function Index (props) {
  // console.log('props------', props)
  const [loading, setLoading] = useState(false)
  const [imageUrl, setImageUrl] = useState(null)
  
  useEffect(() => {
    // 这块在图片编辑时，判断回调来的value是string还是File
    // 如果是File就return，因为getBase64方法里面有监听到本地图片url，防止被覆盖
    if (typeof props.value === 'object') {
      return
    }
    setImageUrl(props.value)
  }, [props.value])
  
  const getBase64 = (img, callback) => {
    const reader = new FileReader()
    reader.addEventListener('load', () => callback(reader.result))
    reader.readAsDataURL(img)
  }
  
  const handleChange = info => {
    if (info.file.status === 'uploading') {
      setLoading(true)
      return
    }
    
    if (info.file.status === 'done') {
      getBase64(info.file.originFileObj, img => {
          setImageUrl(img)
          setLoading(false)
          // 这块根据后台需要传递的数据格式，比如是二进制、base64
          // console.log('info.file.originFileObj------', info.file.originFileObj)
          // 回传给handleSubmit的值
          props.onChange(info.file.originFileObj)
        }
      )
    }
  }
  
  const uploadButton = (
    <div>
      <Icon type={loading ? 'loading' : 'plus'} />
      <div className="ant-upload-text">上传图片</div>
    </div>
  )
  
  return (
    <div>
      <Upload
        name="file"
        listType="picture-card"
        className="avatar-uploader"
        showUploadList={false}
        beforeUpload={beforeUpload}
        onChange={handleChange}
        customRequest={(val) => {
          getBase64(val.file, img => {
              // 通过覆盖默认的上传行为，可以自定义自己的上传实现
              // 这块解决掉action有默认上传的行为，导致线上默认请求
              setImageUrl(img)
              setLoading(false)
              // 这块根据后台需要传递的数据格式，比如是二进制、base64
              // 回传给handleSubmit的值
              props.onChange(val.file)
            }
          )
        }}
        // action={`${apiPrefix}upImg/${TYPE_DATA[type]}`}
      >
        {imageUrl ? <img src={imageUrl} alt="avatar" style={{ width: '100%' }} /> : uploadButton}
      </Upload>
    </div>
  )
}

export default React.forwardRef((props, ref) => {
  return <Index {...props} forwardedRef={ref} />
})
