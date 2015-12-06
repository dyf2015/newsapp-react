import React from 'react';
import Pubsub from 'ntes-pubsub';

export default class Login extends React.Component {
  constructor(props) {
    super(props)
    this.run = this.run.bind(this)
    this.checkCookie = this.checkCookie.bind(this)
    this.userInfo = {
      name: null
    }
  }
  componentDidMount(){
    this.token = Pubsub.subscribe('newsapp:login', (callback)=>{
      if(callback){
        this.callback = callback
      }
      this.run()
    })
    window.__newsapp_login_done = (userInfo)=>{
      if(!!userInfo.name){
        this.userInfo = userInfo
        this.callback(this.userInfo)
        this.callback = ()=>{}
      }
    }
    window.__newsapp_login_canceled = ()=>{
      this.props.getUserInfo(userInfo)
    }
    window.__newsapp_userinfo_done = (userInfo)=>{
      if(!!userInfo){
        this.userInfo = userInfo
        this.callback(this.userInfo)
        this.callback = ()=>{}
      }
    }
  }
  componentWillUnmount(){
    window.__newsapp_login_done = null
    window.__newsapp_userinfo_done = null
    window.__newsapp_login_canceled = null
  }
  checkCookie(){
    let sInfo = getCookie('S_INFO')
    let pInfo = getCookie('P_INFO')
    if(pInfo){
      pInfo = pInfo.split('|')
    }
    if(sInfo){
      sInfo = sInfo.split('|')
      this.userInfo = {
        name: pInfo[0]
      }
      this.callback && this.callback(this.userInfo)
    }else{
      this.userInfo = {name: null}
      this.callback({name: null})
    }
  }
  run(){
    if(!!this.userInfo.name){
      this.props.getUserInfo(this.userInfo)
    }else{
      if(!(/NewsApp/ig).test(navigator.userAgent)){
        // 不在新闻客户端中，检查Cookie
        this.checkCookie()
      }else{
        this.refs.userInfo.src = 'userinfo://'  
        this.refs.login.src = 'login://'  
      }
    }
  }
  render(){
    let style = {
      display: 'none !important'
    }
    return (
      <div style={style}>
        <iframe ref="login" />
        <iframe ref="userInfo" />
      </div>
    )
  }
}


function getCookie (sKey) {
  return decodeURIComponent(document.cookie.replace(new RegExp("(?:(?:^|.*;)\\s*" + encodeURIComponent(sKey).replace(/[\-\.\+\*]/g, "\\$&") + "\\s*\\=\\s*([^;]*).*$)|^.*$"), "$1")) || null;
}