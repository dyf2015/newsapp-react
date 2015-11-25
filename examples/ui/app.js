import React from 'react'
import { render } from 'react-dom'
import UI from '../../src/UI'
import Pubsub from 'ntes-pubsub'
class App extends React.Component {
  constructor(props) {
    super(props)
    this.handleClick = this.handleClick.bind(this)
  }
  handleClick(method, ...args){
    Pubsub.publish('newsapp:ui:' + method, ...args)
  }
  render(){
    return (
      <div>
        <button onClick={this.handleClick.bind(this, 'title', '这是标题这是标题')}>更改标题</button><br />
        <button onClick={this.handleClick.bind(this, 'toolbar', true)}>显示工具栏</button><br />
        <button onClick={this.handleClick.bind(this, 'toolbar', false)}>隐藏工具栏</button><br />
        <button onClick={this.handleClick.bind(this, 'button', '刷新')}>更改右上角按钮为刷新</button><br />
        <button onClick={this.handleClick.bind(this, 'button', '文案', ()=>alert('hello'))}>更改右上角按钮为其他文案</button><br />
        <UI />
      </div>
    )
  }
}

render((
  <App />
), document.getElementById('example'))
