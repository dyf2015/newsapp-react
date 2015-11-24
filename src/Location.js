import React from 'react';
import Pubsub from 'ntes-pubsub';
import assign from './Object.assign'

export default class Location extends React.Component {
  constructor(props) {
    super(props);
    this.getCurrentLocation = this.getCurrentLocation.bind(this)
    this.changeLocation = this.changeLocation.bind(this)
    this.location = null
  }
  componentDidMount(){
    this.token1 = Pubsub.subscribe('newsapp:location:get', (callback)=>{
      if(this.location){
        callback(this.location)
      }else{
        this.getCurrentLocation((location)=>{
          callback(location)
        })
      }
    })
    this.token2 = Pubsub.subscribe('newsapp:location:change', (callback)=>{
      this.changeLocation((location)=>{
        callback(location)
      })
    })
  }
  componentWillUnmount(){
    Pubsub.unsubscribe('newsapp:location:get', this.token1)
    Pubsub.unsubscribe('newsapp:location:change', this.token2)
  }
  getCurrentLocation(callback){
    if((/NewsApp/ig).test(navigator.userAgent)){
      this.refs.iframe.src = "location://current"
      window.__newsapp_location_done = (info)=>{
        window.__newsapp_location_done = null
        this.location = assign({},info)
        callback(info)
      }
    }else{
      callback(null)
    }
  }
  changeLocation(callback){
    if((/NewsApp/ig).test(navigator.userAgent)){
      this.refs.iframe.src = "location://switch"
      window.__newsapp_location_done = (info)=>{
        window.__newsapp_location_done = null
        callback(info || '未知')
      }
    }else{
      callback('未知')
    }
  }
  render(){
    const style = {display: 'none !important'}
    return <iframe ref="iframe" style={style}></iframe>
  }
}