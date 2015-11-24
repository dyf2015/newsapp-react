import React from 'react'
import { render } from 'react-dom'
import Location from '../../src/Location'
import Pubsub from 'ntes-pubsub'
class App extends React.Component {
  constructor(props) {
    super(props)
    this.handleClick = this.handleClick.bind(this)
  }
  handleClick(param){
    if(param == 'get'){
      Pubsub.publish('newsapp:location:get',locationInfo=>{
        alert(JSON.stringify(locationInfo))
      })
    }else{
      Pubsub.publish('newsapp:location:change',locationInfo=>{
        alert(JSON.stringify(locationInfo))
      })
    }
  }
  render(){
    return (
      <div>
        <button onClick={this.handleClick.bind(this, 'get')}>获取地理位置</button>
        <button onClick={this.handleClick.bind(this, 'set')}>更换地理位置</button>
        <Location />
      </div>
    )
  }
}

render((
  <App />
), document.getElementById('example'))
