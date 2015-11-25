import React from 'react';
import Pubsub from 'ntes-pubsub';
import device from './device'
export default class Encrypt extends React.Component {
  constructor(props) {
    super(props)
  }
  componentDidMount(){
    this.token = Pubsub.subscribe('newsapp:encrypt', (encryptedText, callback)=>{
      encryptedText = encodeURIComponent(encryptedText)
      this.callback = callback
      if(device.isIos){
        this.refs.encrypt.src = "encrypt://" + encryptedText
      }else if (window.extra && window.extra.__newsapp_encrypt){
        this.callback(window.extra.__newsapp_encrypt(encryptedText))
      }
    })
    window.__newsapp_encrypt_done = result=>this.callback(result)
  }
  componentWillUnmount(){
    window.__newsapp_encrypt_done = null
  }
  render(){
    let style = {
      display: 'none !important'
    }
    return (
      <div style={style}>
        <iframe ref="encrypt" />
      </div>
    )
  }
}