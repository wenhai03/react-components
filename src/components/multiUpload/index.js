import React from 'react'
import { Upload, Icon, Modal } from 'antd'
import apiConfig from 'apiConfig'
const { apiPrefix } = apiConfig

function getBase64 (file) {
  return new Promise((resolve, reject) => {
    const reader = new FileReader()
    reader.readAsDataURL(file)
    reader.onload = () => resolve(reader.result)
    reader.onerror = error => reject(error)
  })
}

class PicturesWall extends React.Component {
  state = {
    previewVisible: false,
    previewImage: '',
    fileList: [
    ],
  }
  
  handleCancel = () => this.setState({ previewVisible: false })
  
  handlePreview = async file => {
    if (!file.url && !file.preview) {
      file.preview = await getBase64(file.originFileObj)
    }
    
    this.setState({
      previewImage: file.url || file.preview,
      previewVisible: true,
    })
  }
  
  handleChange = ({ fileList }) => {
    // console.log('fileList------', fileList)
    let data = [] // 存放多张图片的集合
    fileList.forEach(({response}) => {
      if (response) {
        data.push({imagePath: response.data})
      }
    })
    // 如果有数据，回调antd中表单的onChange事件
    data.length && this.props.onChange(data)
    
    this.setState({ fileList })
  }
  
  render () {
    const { previewVisible, previewImage, fileList } = this.state
    const uploadButton = (
      <div>
        <Icon type="plus" />
        <div className="ant-upload-text">Upload</div>
      </div>
    )
    return (
      <div className="clearfix">
        <Upload
          name='file'
          action={`${apiPrefix}upImg/cattleImgUpload`}
          listType="picture-card"
          fileList={fileList}
          onPreview={this.handlePreview}
          onChange={this.handleChange}
        >
          {fileList.length >= 8 ? null : uploadButton}
        </Upload>
        <Modal visible={previewVisible} footer={null} onCancel={this.handleCancel}>
          <img alt="example" style={{ width: '100%' }} src={previewImage} />
        </Modal>
      </div>
    )
  }
}

export default PicturesWall
