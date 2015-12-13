import React from 'react';
import Pubsub from 'ntes-pubsub';

export default class Open extends React.Component {
  constructor(props) {
    super(props);
  }
  componentDidMount(){
    this.token = Pubsub.subscribe('newsapp:open', (param)=>{
      let iframe = this.refs.iframe
      alert(param)
      if(/[A-Z0-9]{16}/.test(param)){
        iframe.src = 'newsapp://docid/' + param //文章
      }else if(/^S[0-9]{13}/.test(param)){
        iframe.src = 'newsapp://topic/' + param //专题
      }else if(/^http/.test(param)){
        iframe.src = 'newsapp://web/' + param // 网页
      }else if(/^T[0-9]{13}/.test(param)){
        iframe.src = 'newsapp://reader/' + param // 订阅
      }else if(/^[0-9]{4}\/[0-9]{0,9}/.test(param)){
        iframe.src = 'newsapp://photo/' + param // 图集
      }else if(+param){
        iframe.src = 'newsapp://live/' + param //直播
      }else if(/^V/.test(param)){
        iframe.src = 'newsapp://video/' + param //视频
      }
    })
  }
  componentWillUnmount(){
    Pubsub.unsubscribe('newsapp:open', this.token)
  }
  render(){
    const style = {display: 'none !important'}
    return <iframe ref="iframe" style={style}></iframe>
  }
}