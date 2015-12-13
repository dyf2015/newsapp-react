# 网易新闻客户端接口-react版

> npm install --save newsapp-react ntes-pubsub

## Usage

1. 接口推荐以单例模式使用。
2. **确保在整个页面中，只有一个实例。**
3. 保证在React tree的最外层，确保在publish事件之前，该组件已经装载完毕。
4. 使用发布订阅模式调用接口，具体使用方法如下。  

接口订阅了以`newsapp:`开头的事件，如登录订阅了`newsapp:login`。  
example:

  ```
  // YourComponent.js
  import Pubsub from 'ntes-pubsub'
  import Login from 'newsapp-react/lib/Login'
  // Or
  // import {Login} from 'newsapp-react'
  ...
  componentDidMount(){
    Pubsub.publish('newsapp:login', userInfo=>{
      this.setState({userInfo: userInfo})
    })
  }
  ...
  render(){

    return <div>
      <Login />
      <div>
        ...some other business
      </div>
    </div>

  }
  ```
更多示例请参考[github](https://github.com/dYb/newsapp-react/tree/master/examples)
## Interfaces

- [登录](#login)
- [地理位置](#location)
- [分享](#share)
- [客户端UI调整](#ui)
- [上传图片](#upload)
- [加密](#encrypt)
- [获取设备信息](#encrypt)
- [打开特定原生界面](#view)
- [打开客户端](#open)



### <a name="login"></a>Login
  > 登录： `Login`

  为方便开发，在非新闻客户端中，可以先访问www.163.com登录， 返回的接口为`{name: 登录邮箱名}`
  ```
  ...
    componentDidMount(){
        Pubsub.publish('newsapp:login', userInfo=>{
          this.setState({userInfo: userInfo})
        })
    }
  ...
  ```

### <a name="location"></a>Location
  > 地理位置： `Location`

  * 更换地理位置： `newsapp:location:change`
  * 获取地理位置： `newsapp:location:get`

  ```
  ...
      componentDidMount(){
        Pubsub.publish('newsapp:location:get', locationInfo=>{
          this.setState({locationInfo: locationInfo})
        })
      }
  ...
  ```

### <a name="share"></a>Share
  > 分享： `Share`

  设置默认分享文案：

  ```
    {
      wbText: '微博文案',
      wbPhoto: '微博图片',
      wxText: '微信文案',
      wxTitle: '微信标题',
      wxUrl: '微信地址',
      wxPhoto: '微信图片'
    }
  ```
  
  主动触发分享： `newsapp:share`

  ```
  ...
      handleClick(){
        Pubsub.publish('newsapp:share', shareData)
      }
  ...
  ```

### <a name="ui"></a>UI
  > 客户端UI调整： `UI`

  * 更改标题 `newsapp:ui:title`
    ```
    handleClick(){
      Pubsub.publish('newsapp:ui:title', title)
    }
    ```
  * 更改工具栏 `newsapp:ui:toolbar`
    暂时不起作用。。。
    ```
    handleClick(){
      Pubsub.publish('newsapp:ui:toolbar', true)
    }
    ```
  * 更改标题栏右上角按钮 `newsapp:ui:button`  
    `text`为按钮文案，callback为点击此按钮时触发的回调事件  
    `text`为"刷新"时，将会刷新此页面
    ```
    handleClick(){
      Pubsub.publish('newsapp:ui:button', text, callback)
    }
    ```
    
### <a name="upload"></a>Upload
  > 上传图片： `Upload`

  `props: width(宽度) height(高度) returnUrl（必需，图片上传返回地址）`  
  暂时安卓只有打开图集。  
  在上传图片之前，接口会发布`loading:start`事件,可用于执行动画。  
  ```
    handleClick(){
      Pubsub.publish('newsapp:upload', imgUrl=>{
        
      })
    }
    render(){
      return (
        <Upload />
      )
    }
  ```

### <a name="encrypt"></a>Encrypt
  > 加密： `Encrypt`

  ```
    handleClick(){
      // stringWillBeEncrypted 需要加密的字符串
      Pubsub.publish('newsapp:encrypt', stringWillBeEncrypted, result=>{
        alert(result)
      })
    }
    render(){
      return (
        <Encrypt />
      )
    }
  ```
### <a name="device"></a>Device
  > 获取设备信息： `Device`
  
  * 获取deviceId
  ```
    handleClick(){
      Pubsub.publish('newsapp:device:id', id=>{
        
      })
    }
    render(){
      return (
        <Device />
      )
    }
  ```
  * 获取trashId（主要用于防刷）
  ```
    handleClick(){
      Pubsub.publish('newsapp:upload:trashid', id=>{
        // 此ID为Object， 整体为trashid，一般需要转换字符串传给后台
      })
    }
    render(){
      return (
        <Device />
      )
    }
  ```
### <a name="view"></a>View
  > 打开特定页面： `View`
  
  * font : 设置字体
  * feedback : 商城反馈 
  * personalcenter : 个人主页 
  * mytask : 我的任务(ios:v4.3+ android:v4.4+) 
  * inapppurchase : 内购支付页面(v4.4+，必须要用户登陆) 
  ```
    handleClick(){
      let type = '' // type为以上之一
      Pubsub.publish('newsapp:view', type)

    }
    render(){
      return (
        <View />
      )
    }
  ```
  * 获取trashId（主要用于防刷）
  ```
    handleClick(){
      Pubsub.publish('newsapp:upload:trashid', id=>{
        // 此ID为Object， 整体为trashid，一般需要转换字符串传给后台
      })
    }
    render(){
      return (
        <Device />
      )
    }
  ```

### <a name="open"></a>Open
  > 打开客户端： `Open`。  
  > （注： 此接口仅限在客户端内使用，客户端外部使用在iOS9下无法打开客户端）

  目前支持： 文章、专题、网页、订阅、图集、直播、视频


  ```
    handleClick(){
      Pubsub.publish('newsapp:open', param)
      // param 为文章ID或者专题ID或者其他。
      // 注：图集的格式为 频道ID/图集ID，如： 0096/123123
    }
    render(){
      return (
        <Open />
      )
    }
  ```


## Changelog
* 2015/12/13 增加打开客户端接口
* 2015/12/09 增加打开原生界面接口
* 2015/12/06 增加获取trashId接口，增加对非客户端中登录校验的支持 
* 2015/11/25 增加加密、更改客户端UI界面的接口与DEMO
* 2015/11/24 增加登录、分享、上传照片的DEMO
* 2015/10/26 项目建立




