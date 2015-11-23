import React from 'react';
import Pubsub from 'ntes-pubsub';

export default class Upload extends React.Component {
  constructor(props) {
    super(props)
    this.token = null
    this.isAndroid = !!navigator.userAgent.match(/android/ig)
    this.fileChanged = this.fileChanged.bind(this)
    this.run = this.run.bind(this)
    this.callback = ()=>{}
  }
  static propTypes = {
    width: React.PropTypes.number,
    height: React.PropTypes.number,
    returnUrl: React.PropTypes.string.isRequired
  }
  componentDidMount(){
    this.token = Pubsub.subscribe('newsapp:upload', (callback)=>{
      if(callback){
        this.callback = callback
      }
      this.run()
    })

    window.iosReturn = (imgUrl)=> {
      this.callback(imgUrl)
    }
    window.__newsapp_upload_image_done = (imgUrl)=>{
      this.callback(imgUrl)
    }
  }
  componentWillUnmount(){
    Pubsub.unsubscribe('newsapp:upload', this.token)
    window.__newsapp_upload_image_done = null
    window.iosReturn = null
  }
  fileChanged(){
    let file = this.refs.inputFile.files[0]
    if (file && /image\/\w+/.test(file.type) ) {
      Pubsub.publish('loading:start')
      this.refs.form.submit()
    }
  }
  run(){
    if (this.isAndroid){
      this.refs.iframe.src = 'uploadimage://album/'
    }else{
      this.refs.inputFile.click()
    }
  }
  render(){
    let style = {
      display: 'none !important'
    }
    if(this.isAndroid){
      return <iframe ref="iframe" style={style}></iframe>
    }else{
      return <div style={style}>
        <iframe ref="iosupload" name="iosupload" style={style}></iframe>
        <form ref="form" action={`http://c.3g.163.com/uc/photo/upload?rt=${this.props.returnUrl}&size=${this.props.width}x${this.props.height}x0`} target="iosupload" encType="multipart/form-data" method="POST">
          <input type="file" accept="image/*" name="abc" ref="inputFile" onChange={this.fileChanged.bind(this)}/>
        </form>
      </div>
      
    }
  }
}