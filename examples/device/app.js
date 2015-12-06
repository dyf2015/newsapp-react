import React from 'react'
import { render } from 'react-dom'
import Device from '../../src/Device'
import Pubsub from 'ntes-pubsub'
class App extends React.Component {
  constructor(props) {
    super(props)
    this.handleClick = this.handleClick.bind(this)
  }
  handleClick(type){
    if(type == 'id'){
      Pubsub.publish('newsapp:device:id', info=>alert(JSON.stringify(info)))
    }else {
      Pubsub.publish('newsapp:device:trashid', info=>alert(JSON.stringify(info)))
    }
  }
  render(){
    return (
      <div>
        <button onClick={this.handleClick.bind(this, 'id')}>获取设备信息</button><br /><br />
        <button onClick={this.handleClick.bind(this, 'transhid')}>获取TrashId</button><br />
        <Device />
      </div>
    )
  }
}

render((
  <App />
), document.getElementById('example'))
