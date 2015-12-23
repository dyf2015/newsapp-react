import React from 'react'
import { render } from 'react-dom'
import Open from '../../src/Open'
import Pubsub from 'ntes-pubsub'
class App extends React.Component {
  constructor(props) {
    super(props);
    this.handleClick = this.handleClick.bind(this)
  }
  handleClick(param){
    Pubsub.publish('newsapp:open', param)
  }
  render(){
    return (
      <div>
        <Open />
        <button onClick={this.handleClick.bind(this, '951C0KA70001124J')}>文章</button>
        <button onClick={this.handleClick.bind(this, 'S1385797470941')}>专题</button>
        <button onClick={this.handleClick.bind(this, 'http://3g.163.com')}>网页</button>
        <button onClick={this.handleClick.bind(this, 'T1374482883888')}>订阅</button>
        <button onClick={this.handleClick.bind(this, '54GI0096|85219')}>图集</button>
        <button onClick={this.handleClick.bind(this, '55474')}>直播</button>
        <button onClick={this.handleClick.bind(this, 'VB4F6CDIJ')}>视频</button>
      </div>
    )
  }
}

render((
  <App />
), document.getElementById('example'))
