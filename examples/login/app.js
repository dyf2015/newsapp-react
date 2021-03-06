import React from 'react'
import { render } from 'react-dom'
import Login from '../../src/Login'
import Pubsub from 'ntes-pubsub'
class App extends React.Component {
  constructor(props) {
    super(props)
    this.handleClick = this.handleClick.bind(this)
  }
  handleClick(){
    Pubsub.publish('newsapp:login',userInfo=>{
      alert(JSON.stringify(userInfo))
    })
  }
  render(){
    return (
      <div>
        <button onClick={this.handleClick}>校验登录</button>
        <Login />
      </div>
    )
  }
}

render((
  <App />
), document.getElementById('example'))
