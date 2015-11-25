import React from 'react'
import { render } from 'react-dom'
import Upload from '../../src/Upload'
import Pubsub from 'ntes-pubsub'
class App extends React.Component {
  constructor(props) {
    super(props);
    this.token = null
    this.state = {
      src: ''
    }
    this.handleClick = this.handleClick.bind(this)
  }
  handleClick(){
    Pubsub.publish('newsapp:upload', imgUrl=>{
      alert(imgUrl)
      this.setState({src: imgUrl})
    })
  }
  render(){
    let href = location.origin + '/__build__/upload/return.html'
    return (
      <div>
        <button onClick={this.handleClick}>上传图片</button>
        <img src={this.state.src} />
        <Upload width={320} height={10000} returnUrl={href} />
      </div>
    )
  }
}

render((
  <App />
), document.getElementById('example'))
