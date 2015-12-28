import React from 'react';
import Pubsub from 'ntes-pubsub';
import platform from './platform';

export default class Open extends React.Component {
  constructor(props) {
    super(props);
  }
  componentDidMount(){
    this.token = Pubsub.subscribe('newsapp:open', (param)=>{
      let iframe = this.refs.iframe
      if(/[A-Z0-9]{16}/.test(param)){
        if(platform.isNewsapp){
          iframe.src = 'newsapp://doc/' + param //文章  
        }else{
          window.location.href = 'http://3g.163.com/ntes/special/0034073A/wechat_article.html?docid=' + param
        }
      }else if(/^S[0-9]{13}/.test(param)){
        if(platform.isNewsapp){
          iframe.src = 'newsapp://topic/' + param //专题
        }else{
          window.location.href = 'http://3g.163.com/ntes/special/00340EPA/wapSpecialModule.html?sid=' + param
        }
      }else if(/^http/.test(param)){
        if(platform.isNewsapp){
          iframe.src = 'newsapp://web/' + param // 网页
        }else{
          window.location.href = param
        }
      }else if(/^T[0-9]{13}/.test(param)){
        iframe.src = 'newsapp://reader/' + param // 订阅
      }else if(+param){
        if(platform.isNewsapp){
          iframe.src = 'newsapp://live/' + param //直播
        }else{
          window.location.href = 'http://3g.163.com/ntes/special/00340BF8/seventlive.html?spsw=1&spsf=wx&spss=newsapp&roomid=' + param
        }
      }else if(/^V/.test(param)){
        if(platform.isNewsapp){
          iframe.src = 'newsapp://video/' + param //视频
        }else{
          window.location.href = 'http://3g.163.com/ntes/special/0034073A/wechat_article.html?videoid=' + param
        }
      }else if(/^[A-Z0-9]{8}|[0-9]{0,9}/.test(param)){
        let temp = param.split('|')
        if(platform.isNewsapp){
          iframe.src = 'newsapp://photo/' + temp[0].slice(-4) + '/' + temp[1] // 图集
        }else{
          window.location.href = `http://3g.163.com/ntes/special/0034073A/photoshare.html?setid=${temp[1]}&channelid=${temp[0].slice(-4)}`
        }
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