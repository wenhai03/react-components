import React from 'react'
import { connect } from 'react-redux'
import MeScroll from 'mescroll.js'
import 'mescroll.js/mescroll.min.css'

class Mescroll extends React.Component {
  constructor (props) {
    super(props)
    this.mescroll = null
    this.pageSize = (this.props.params&&this.props.params.size) || 20
    this.totalPages = 1
    this.currentPage = 1
    this.state = {
      scrollData: []
    }
  }
  
  setPagination (res) {
    if (res.totalPages) {
      this.totalPages = res.totalPages
    } else {
      this.totalPages = Math.ceil(res.count / this.pageSize)
    }
  }
  
  downRefresh = async type => {
    //下拉刷新，请求第一页，初始化分页信息
    this.currentPage = 1
    let { getData, params } = this.props
    let _params = { page: 1, size: this.pageSize, ...params }
    let res = await getData(_params, type)
    if (res && res.error) {
      return this.mescroll.endErr()
    }
    let data = res.results
    let currentPageCount = data.length
    let hasNextPage = true
    this.setState({
      scrollData: data
    })
    this.setPagination(res)
    hasNextPage = this.currentPage < this.totalPages // 是否还有下一页
    this.mescroll.endSuccess(currentPageCount, hasNextPage)
  }
  
  upGetMore = async (page, type) => {
    // 上拉加载更多
    ++this.currentPage
    let { getData, params = {} } = this.props
    let _params = { page: this.currentPage, size: this.pageSize, ...params }
    let res = await getData(_params, type)
    if (res.error) {
      --this.currentPage
      return this.mescroll.endErr()
    }
    let data = res.results
    let currentPageCount = data.length
    let hasNextPage = true
    let scrollData = this.state.scrollData
    this.setState({
      scrollData: [...scrollData, ...data]
    })
    this.setPagination(res)
    hasNextPage = this.currentPage < this.totalPages
    this.mescroll.endSuccess(currentPageCount, hasNextPage)
  }
  
  setMeScroll () {
    let { config = {}, language } = this.props
    let {
      auto = true,
      autoShowLoading = true,
      downUse,
      upUse,
      warpClass,
      noDataIcon = null,
      noAnyDataTip = this.props.language['no_data']
    } = config
    this.mescroll = new MeScroll('mescroll', {
      down: {
        use: downUse === void 0 ? true : downUse,
        isBounce: true,
        auto,
        offset: 40,
        autoShowLoading: autoShowLoading,
        mustToTop: true,
        textInOffset: '',
        textLoading: '',
        textOutOffset: '',
        warpClass: warpClass,
        callback: () => {
          this.downRefresh('down')
        }
      },
      up: {
        use: upUse === void 0 ? true : upUse,
        isBounce: true, // 是否允许ios的bounce回弹;默认true,允许弹
        auto: false, // 是否在初始化完毕之后自动执行一次上拉加载的调
        callback: page => {
          this.upGetMore(page, 'up')
        },
        page: {
          num: 1,
          size: this.pageSize
        },
        noMoreSize: 5,
        htmlNodata: `<p class="upwarp-nodata">--${
          language['has_no_data']
        }--</p>`,
        empty: {
          warpId: 'mescroll',
          tip: noAnyDataTip,
          icon: noDataIcon
          //btntext: '点击刷新',
          //btnClick: this.resetUpScroll
        }
      }
    })
  }
  
  resetUpScroll = downRefresh => {
    this.currentPage = 0
    this.mescroll.resetUpScroll(downRefresh) // 重置列表为第一页 传参true, 则显示下拉刷新的进度布局
  }
  
  componentDidMount () {
    this.setMeScroll()
  }
  
  render () {
    let { scrollData } = this.state
    let { mescrollWrapperStyle, customClass } = this.props
    return (
      <div className={`mescroll ${customClass}`} id="mescroll">
        <div className="mescroll-wrapper" style={mescrollWrapperStyle}>
          {typeof this.props.children === 'function'
            ? this.props.children(scrollData)
            : this.props.children}
        </div>
      </div>
    )
  }
}

let mapStateToProps = state => {
  return {
    language: state.appState.language
  }
}

export default connect(
  mapStateToProps,
  null,
  null,
  { withRef: true }
)(Mescroll)
