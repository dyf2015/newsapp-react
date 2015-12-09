import React from 'react'
import { render } from 'react-dom'
import View from '../../src/View'
import Pubsub from 'ntes-pubsub'
class App extends React.Component {
  constructor(props) {
    super(props);
    this.handleClick = this.handleClick.bind(this)
  }
  handleClick(type){
    Pubsub.publish('newsapp:view', type)
  }
  render(){
    return (
      <div>
        <View />
        <button onClick={this.handleClick.bind(this, 'font')}>设置字体</button>
        <button onClick={this.handleClick.bind(this, 'feedback')}>商城反馈</button>
        <button onClick={this.handleClick.bind(this, 'personalcenter')}>个人主页</button>
        <button onClick={this.handleClick.bind(this, 'mytask')}>我的任务</button>
        <button onClick={this.handleClick.bind(this, 'inapppurchase')}>内购支付页面</button>
      </div>
    )
  }
}

render((
  <App />
), document.getElementById('example'))
