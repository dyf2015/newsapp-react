import React from 'react'
import { render } from 'react-dom'
import Share from '../../src/Share'
import Pubsub from 'ntes-pubsub'
class App extends React.Component {
  constructor(props) {
    super(props)
    this.handleClick = this.handleClick.bind(this)
    this.state = {
      'text': null
    }
  }
  handleClick(){
    Pubsub.publish('newsapp:share', Object.assign(this.state, {wxText: '这是主动触发的分享'}))
  }
  render(){
    return (
      <div>
        <button onClick={this.handleClick}>分享</button>
        <input type="text" />
        <Share {...this.state} />
      </div>
    )
  }
}

render((
  <App />
), document.getElementById('example'))
