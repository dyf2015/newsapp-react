import React from 'react';
import Pubsub from 'ntes-pubsub';
import assign from 'object-assign'

export default class Share extends React.Component {
  constructor(props) {
    super(props);
    this.token = null
    this.state = assign({
      wbText: '微博文案',
      wbPhoto: '微博图片',
      wxText: '微信文案',
      wxTitle: '微信标题',
      wxUrl: '微信地址',
      wxPhoto: '微信图片'
    }, this.props)
    this.share = this.share.bind(this)
  }
  static propTypes = {
    wbText: React.PropTypes.string,
    wbPhoto: React.PropTypes.string,
    wxText: React.PropTypes.string,
    wxTitle: React.PropTypes.string,
    wxUrl: React.PropTypes.string,
    wxPhoto: React.PropTypes.string
  }
  componentDidMount(){
    this.token = Pubsub.subscribe('newsapp:share', (shareData) => {
      this.setState({
        wbText: shareData.wbText,
        wbPhoto: shareData.wbPhoto,
        wxText: shareData.wxText,
        wxTitle: shareData.wxTitle,
        wxUrl: shareData.wxUrl,
        wxPhoto: shareData.wxPhoto
      }, ()=> {
        this.share()
      })
    })
  }
  componentWillUnmount(){
    Pubsub.unsubscribe('newsapp:share', this.token)
  }
  share(callback){
    window.__newsapp_share_done = (result)=>{
      window.__newsapp_share_done = null
      callback && callback()
    }
    this.refs.iframe.src = "share://0"
  }
  render(){
    let style = {
      display: 'none !important'
    }
    return <div style={style}>
      <div style={style} id="__newsapp_sharetext">{this.state.wbText}</div>
      <div style={style} id="__newsapp_sharephotourl">{this.state.wbPhoto}</div>
      <div style={style} id="__newsapp_sharewxtext">{this.state.wxText}</div>
      <div style={style} id="__newsapp_sharewxtitle">{this.state.wxTitle}</div>
      <div style={style} id="__newsapp_sharewxurl">{this.state.wxUrl}</div>
      <div style={style} id="__newsapp_sharewxthumburl">{this.state.wxPhoto}</div>
      <iframe ref="iframe"  style={style}></iframe>
    </div>
  }
}