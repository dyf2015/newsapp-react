import React from 'react';
import Pubsub from 'ntes-pubsub';
import platform from './platform';

export default class Device extends React.Component {
  constructor(props) {
    super(props);
    this.location = null
  }
  componentDidMount(){
    this.token1 = Pubsub.subscribe('newsapp:device:id', (callback)=>{
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
    this.token2 = Pubsub.subscribe('newsapp:device:trashid', callback=>{
      window.__newsapp_trashid_done  = trashid=>{
          window.__newsapp_trashid_done  = null
          callback(trashid)
        }
        this.refs.iframe.src = 'trashid://'
    })
  }
  componentWillUnmount(){
    Pubsub.unsubscribe('newsapp:device:id', this.token1)
    Pubsub.unsubscribe('newsapp:device:trashid', this.token2)
  }
  render(){
    const style = {display: 'none !important'}
    return <iframe ref="iframe" style={style}></iframe>
  }
}