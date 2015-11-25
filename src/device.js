const ua = navigator.userAgent
alert(ua)
let device = {
  isNewsapp: !!ua.match(/newsapp/i),
  isIos: !!ua.match(/\(i[^;]+;( U;)? CPU.+Mac OS X/),
  isAndroid: !!ua.match(/android/i)
}
export default device