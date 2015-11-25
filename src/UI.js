import React from 'react';
import Pubsub from 'ntes-pubsub';

export default class UI extends React.Component {
  constructor(props) {
    super(props)
  }
  componentDidMount(){
    this.token1 = Pubsub.subscribe('newsapp:ui:title', (title)=>{
      this.refs.ui.src = 'docmode://modifytitle/' + encodeURIComponent(title)
    })
    this.token2 = Pubsub.subscribe('newsapp:ui:toolbar', show=>{
      this.refs.ui.src = 'docmode://toolbar/' + show? 'show' : 'hide'
    })
    this.token3 = Pubsub.subscribe('newsapp:ui:button', (text, callback)=>{
      this.refs.ui.src = 'docmode://actionbutton/' + encodeURIComponent(text)
      window.__newsapp_browser_actionbutton = ()=>callback()
    })
  }
  componentDidUpdate(){
    if(this.props.title && this.props.title != document.title){
      this.refs.ui.src = 'docmode://modifytitle/' + encodeURIComponent(this.props.title)
    }
  }
  componentWillUnmount(){
    Pubsub.unsubscribe('newsapp:ui:title', this.token1)
    Pubsub.unsubscribe('newsapp:ui:toolbar', this.token2)
    Pubsub.unsubscribe('newsapp:ui:button', this.token3)
    window.__newsapp_browser_actionbutton = null
  }
  render(){
    const style = {
      display: 'none'
    }
    
    return (
      <iframe ref="ui" style={style} />
    )
  }
}