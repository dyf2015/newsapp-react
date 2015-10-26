import React from 'react';

export default class Login extends React.Component {
  constructor(props) {
    super(props)
    this.run = this.run.bind(this)
    this.userInfo = null
  }
  componentDidMount(){
    this.token = Pubsub.subscribe('newsapp:login', (callback)=>{
      if(callback){
        this.callback = callback
      }
      this.run()
    })
    window.__newsapp_login_done = (userInfo)=>{
      if(!!userInfo){
        this.userInfo = userInfo
        this.props.getUserInfo(userInfo)
      }
    }
    window.__newsapp_login_canceled = ()=>{
      this.props.getUserInfo(userInfo)
    }
    window.__newsapp_userinfo_done = (userInfo)=>{
      if(!!userInfo){
        this.userInfo = userInfo
        this.props.getUserInfo(userInfo)
      }
    }
  }
  componentWillUnmount(){
    window.__newsapp_login_done = null
    window.__newsapp_userinfo_done = null
    window.__newsapp_login_canceled = null
  }
  run(){
    if(!(/NewsApp/ig).test(navigator.userAgent)){
      this.callback(false)
    }else{
      if(!!this.userInfo){
        this.props.getUserInfo(this.userInfo)
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