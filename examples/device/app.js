import React from 'react'
import { render } from 'react-dom'
import Device from '../../src/Device'
import Pubsub from 'ntes-pubsub'
class App extends React.Component {
  constructor(props) {
    super(props)
    this.handleClick = this.handleClick.bind(this)
  }
  handleClick(){
    Pubsub.publish('newsapp:device', info=>alert(JSON.stringify(info)))
  }
  render(){
    return (
      <div>
        <button onClick={this.handleClick}>获取设备信息</button><br />
        <Device />
      </div>
    )
  }
}

render((
  <App />
), document.getElementById('example'))
