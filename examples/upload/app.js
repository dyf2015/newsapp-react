import React from 'react'
import { render } from 'react-dom'
import Upload from '../../src/Upload'
import Pubsub from 'ntes-pubsub'
class App extends React.Component {
  constructor(props) {
    super(props)
    this.handleClick = this.handleClick.bind(this)
    this.state = {}
  }
  componentDidMount(){
    this.token = Pubsub.subscribe('loading:start', ()=>{
      alert('loading start')
    })
  }
  componentWillUnmount(){
    Pubsub.unsubscribe('loading:start', this.token)
  }
  handleClick(){
    Pubsub.publish('newsapp:upload',imgsrc=>{
      this.setState({src: imgsrc})
    })
  }
  render(){
    return (
      <div>
        <button onClick={this.handleClick}>上传图片</button>
        <img src={this.state.src} />
        <Upload width={750} height={10000} returnUrl="http://c.3g.163.com/uc/photo/upload?rt=f2e.developer.163.com/ybduan/newsapp-react/upload/return.html&size=750x10000x0" />
      </div>
    )
  }
}

render((
  <App />
), document.getElementById('example'))
