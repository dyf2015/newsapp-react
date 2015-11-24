### 网易新闻客户端接口-react版

> npm install --save newsapp-react ntes-pubsub

#### Usage

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

#### Interfaces

- [登录](#Login)
- [地理位置](#Location)
- [分享](#Share)
- [客户端UI调整](#UI)
- [上传图片](#Upload)



* Login
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

* Location
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

* Share
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

* UI
  > 客户端UI调整： `UI`

  * 更改标题 `newsapp:title`
    ```
    componentDidMount(){
      Pubsub.publish('newsapp:title', title)
    }
    ```
    
*  Upload
  > 上传图片： `Upload`

  props: width(宽度) height(高度) returnUrl（必需，图片上传返回地址）  
  暂时安卓只有打开图集。  
  在上传图片之前，接口会发布`loading:start`事件。  
  ```
    componentDidMount(){
      Pubsub.publish('newsapp:upload', imgUrl=>{
        
      })
    }
  ```

### Changelog
* 2015/10/26 项目建立
* 2015/11/24 增加登录、分享、上传照片的DEMO




### Todos
* DEMO页
* 增加其他接口
* 单元测试



