import React from 'react'
import { render } from 'react-dom'
import Login from '../../src/Login'
import Pubsub from 'ntes-pubsub'
class App extends React.Component {
  componentDidMount(){
    Pubsub.publish('newsapp:upload',userInfo=>{
      alert(JSON.stringify(userInfo))
    })
  }
  render(){
    return (
      <div>
        <Login />
      </div>
    )
  }
}

render((
  <App />
), document.getElementById('example'))
