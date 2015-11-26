import React from 'react';
import Pubsub from 'ntes-pubsub';
import platform from './platform';

export default class Device extends React.Component {
  constructor(props) {
    super(props);
    this.location = null
  }
  componentDidMount(){
    this.token = Pubsub.subscribe('newsapp:device', (callback)=>{
      if(platform.isAndroid){
        callback(__newsapp_deviceid())
      }else{
        window.__newsapp_device_done = deviceInfo=>{
          window.__newsapp_device_done = null
          callback(deviceInfo)
        }
        this.refs.iframe.src = 'device://'
      }
    })
  }
  componentWillUnmount(){
    Pubsub.unsubscribe('newsapp:device', this.token)
  }
  render(){
    const style = {display: 'none !important'}
    return <iframe ref="iframe" style={style}></iframe>
  }
}