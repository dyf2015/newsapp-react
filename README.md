# 网易新闻客户端接口-react版

> npm install --save newsapp-react ntes-pubsub

## Usage

大部分接口推荐以单例模式使用。  
接口订阅了以`newsapp:`开头的事件，如登录订阅了`newsapp:login`。  
example:

  ```
  // YourComponent.js
  import Pubsub from 'ntes-pubsub'
  ...
  componentDidMount(){
    Pubsub.publish('newsapp:login', userInfo=>{
      this.setState({userInfo: userInfo})
    })
  }
  ...
  ```

## Interfaces

- [登录](#login)
- [地理位置](#location)
- [分享](#share)
- [客户端UI调整](#ui)
- [上传图片](#upload)
- [加密](#encrypt)



### <a name="login"></a>Login
  > 登录： `Login`

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

## Changelog
* 2015/11/25 增加加密、更改客户端UI界面的接口与DEMO
* 2015/11/24 增加登录、分享、上传照片的DEMO
* 2015/10/26 项目建立




## Todos
* DEMO页
* 增加其他接口
* 单元测试



