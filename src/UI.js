import React from 'react';
import Pubsub from 'ntes-pubsub';

export default class UI extends React.Component {
  constructor(props) {
    super(props)
  }
  componentDidMount(){
    Pubsub.subscribe('newsapp:title', (title)=>{
      this.refs.title.src = 'docmode://modifytitle/' + encodeURIComponent(title)
    })
  }
  componnetDidUpdate(){
    if(this.props.title && this.props.title != document.title){
      this.refs.title.src = 'docmode://modifytitle/' + encodeURIComponent(this.props.title)
    }
  }
  render(){
    const style = {
      display: 'none'
    }
    
    return (
      <iframe ref="title" style={style} />
    )
  }
}