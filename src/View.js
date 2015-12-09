import React from 'react';
import Pubsub from 'ntes-pubsub';

export default class View extends React.Component {
  constructor(props) {
    super(props);
  }
  componentDidMount(){
    this.token = Pubsub.subscribe('newsapp:view', (type)=>{
      this.refs.iframe.src = 'pushview://' + type
    })
  }
  componentWillUnmount(){
    Pubsub.unsubscribe('newsapp:view', this.token)
  }
  render(){
    const style = {display: 'none !important'}
    return <iframe ref="iframe" style={style}></iframe>
  }
}