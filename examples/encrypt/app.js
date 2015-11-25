import React from 'react'
import { render } from 'react-dom'
import Encrypt from '../../src/Encrypt'
import Pubsub from 'ntes-pubsub'
class App extends React.Component {
  constructor(props) {
    super(props)
    this.handleClick = this.handleClick.bind(this)
  }
  handleClick(param){
    Pubsub.publish('newsapp:encrypt', JSON.stringify(param), result=>alert(result))
  }
  render(){
    const json = {
      "a": "a",
      "b": "b"
    }
    return (
      <div>
        <button onClick={this.handleClick.bind(this, json)}>加密JSON</button>
        <Encrypt />
      </div>
    )
  }
}

render((
  <App />
), document.getElementById('example'))
