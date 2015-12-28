'use strict';

var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _ntesPubsub = require('ntes-pubsub');

var _ntesPubsub2 = _interopRequireDefault(_ntesPubsub);

var _platform = require('./platform');

var _platform2 = _interopRequireDefault(_platform);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var Open = (function (_React$Component) {
  _inherits(Open, _React$Component);

  function Open(props) {
    _classCallCheck(this, Open);

    return _possibleConstructorReturn(this, Object.getPrototypeOf(Open).call(this, props));
  }

  _createClass(Open, [{
    key: 'componentDidMount',
    value: function componentDidMount() {
      var _this2 = this;

      this.token = _ntesPubsub2.default.subscribe('newsapp:open', function (param) {
        var iframe = _this2.refs.iframe;
        if (/[A-Z0-9]{16}/.test(param)) {
          if (_platform2.default.isNewsapp) {
            iframe.src = 'newsapp://doc/' + param; //文章
          } else {
              window.location.href = 'http://3g.163.com/ntes/special/0034073A/wechat_article.html?docid=' + param;
            }
        } else if (/^S[0-9]{13}/.test(param)) {
          if (_platform2.default.isNewsapp) {
            iframe.src = 'newsapp://topic/' + param; //专题
          } else {
              window.location.href = 'http://3g.163.com/ntes/special/00340EPA/wapSpecialModule.html?sid=' + param;
            }
        } else if (/^http/.test(param)) {
          if (_platform2.default.isNewsapp) {
            iframe.src = 'newsapp://web/' + param; // 网页
          } else {
              window.location.href = param;
            }
        } else if (/^T[0-9]{13}/.test(param)) {
          iframe.src = 'newsapp://reader/' + param; // 订阅
        } else if (+param) {
            if (_platform2.default.isNewsapp) {
              iframe.src = 'newsapp://live/' + param; //直播
            } else {
                window.location.href = 'http://3g.163.com/ntes/special/00340BF8/seventlive.html?spsw=1&spsf=wx&spss=newsapp&roomid=' + param;
              }
          } else if (/^V/.test(param)) {
            if (_platform2.default.isNewsapp) {
              iframe.src = 'newsapp://video/' + param; //视频
            } else {
                window.location.href = 'http://3g.163.com/ntes/special/0034073A/wechat_article.html?videoid=' + param;
              }
          } else if (/^[A-Z0-9]{8}|[0-9]{0,9}/.test(param)) {
            var temp = param.split('|');
            if (_platform2.default.isNewsapp) {
              iframe.src = 'newsapp://photo/' + temp[0].slice(-4) + '/' + temp[1]; // 图集
            } else {
                window.location.href = 'http://3g.163.com/ntes/special/0034073A/photoshare.html?setid=' + temp[1] + '&channelid=' + temp[0].slice(-4);
              }
          }
      });
    }
  }, {
    key: 'componentWillUnmount',
    value: function componentWillUnmount() {
      _ntesPubsub2.default.unsubscribe('newsapp:open', this.token);
    }
  }, {
    key: 'render',
    value: function render() {
      var style = { display: 'none !important' };
      return _react2.default.createElement('iframe', { ref: 'iframe', style: style });
    }
  }]);

  return Open;
})(_react2.default.Component);

exports.default = Open;