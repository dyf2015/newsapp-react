import React from 'react'
import { render } from 'react-dom'
import Share from '../../src/Share'
import Pubsub from 'ntes-pubsub'
class App extends React.Component {
  constructor(props) {
    super(props)
    this.handleClick = this.handleClick.bind(this)
    this.state = {
      wbText: '微博文案',
      wbPhoto: 'http://pimg1.126.net/caipiao_info/images/team/130tm/2017.png',
      wxText: '微信文案',
      wxTitle: '微信标题',
      wxUrl: 'http://www.163.com',
      wxPhoto: 'http://pimg1.126.net/caipiao_info/images/team/130tm/2017.png'
    }
  }
  handleClick(){
    Pubsub.publish('newsapp:share', Object.assign(this.state, {wxText: '这是主动触发的分享'}))
  }
  render(){
    return (
      <div>
        <button onClick={this.handleClick}>分享</button>
        <Share {...this.state} />
      </div>
    )
  }
}

render((
  <App />
), document.getElementById('example'))
