import React from 'react';
import Pubsub from 'ntes-pubsub';
export default class Copy extends React.Component {
  constructor(props) {
    super(props);
    this.token = null
  }
  componentDidMount(){
    this.token = Pubsub.subscribe('newsapp:copy', (copyText) => {
      this.refs.iframe.src = 'copy://' + encodeURIComponent(copyText)
    })
  }
  componentWillUnmount(){
    Pubsub.unsubscribe('newsapp:copy', this.token)
  }
  render(){
    let style = {
      display: 'none !important'
    }
    return <div style={style}>
      <iframe ref="iframe"  style={style}></iframe>
    </div>
  }
}