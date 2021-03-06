'use strict';

var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _ntesPubsub = require('ntes-pubsub');

var _ntesPubsub2 = _interopRequireDefault(_ntesPubsub);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var Login = (function (_React$Component) {
  _inherits(Login, _React$Component);

  function Login(props) {
    _classCallCheck(this, Login);

    var _this = _possibleConstructorReturn(this, Object.getPrototypeOf(Login).call(this, props));

    _this.run = _this.run.bind(_this);
    _this.checkCookie = _this.checkCookie.bind(_this);
    _this.userInfo = {
      name: null
    };
    return _this;
  }

  _createClass(Login, [{
    key: 'componentDidMount',
    value: function componentDidMount() {
      var _this2 = this;

      this.token = _ntesPubsub2.default.subscribe('newsapp:login', function (callback) {
        if (callback) {
          _this2.callback = callback;
        }
        _this2.run();
      });
      window.__newsapp_login_done = function (userInfo) {
        if (!!userInfo.name) {
          _this2.userInfo = userInfo;
          _this2.callback(_this2.userInfo);
          _this2.callback = function () {};
        }
      };
      window.__newsapp_login_canceled = function () {
        _this2.props.getUserInfo(userInfo);
      };
      window.__newsapp_userinfo_done = function (userInfo) {
        if (!!userInfo) {
          _this2.userInfo = userInfo;
          _this2.callback(_this2.userInfo);
          _this2.callback = function () {};
        } else {
          _this2.refs.login.src = 'login://';
        }
      };
    }
  }, {
    key: 'componentWillUnmount',
    value: function componentWillUnmount() {
      window.__newsapp_login_done = null;
      window.__newsapp_userinfo_done = null;
      window.__newsapp_login_canceled = null;
    }
  }, {
    key: 'checkCookie',
    value: function checkCookie() {
      var sInfo = getCookie('S_INFO');
      var pInfo = getCookie('P_INFO');
      if (pInfo) {
        pInfo = pInfo.split('|');
      }
      if (sInfo) {
        sInfo = sInfo.split('|');
        this.userInfo = {
          name: pInfo[0]
        };
        this.callback && this.callback(this.userInfo);
      } else {
        this.userInfo = { name: null };
        this.callback({ name: null });
      }
    }
  }, {
    key: 'run',
    value: function run() {
      if (!/NewsApp/ig.test(navigator.userAgent)) {
        // 不在新闻客户端中，检查Cookie
        this.checkCookie();
      } else if (!!getCookie('S_INFO')) {
        // S_INFO存在，调用userinfo://协议
        this.refs.userInfo.src = 'userinfo://';
      } else {
        this.refs.login.src = 'login://';
      }
    }
  }, {
    key: 'render',
    value: function render() {
      var style = {
        display: 'none !important'
      };
      return _react2.default.createElement(
        'div',
        { style: style },
        _react2.default.createElement('iframe', { ref: 'login' }),
        _react2.default.createElement('iframe', { ref: 'userInfo' })
      );
    }
  }]);

  return Login;
})(_react2.default.Component);

exports.default = Login;

function getCookie(sKey) {
  return decodeURIComponent(document.cookie.replace(new RegExp("(?:(?:^|.*;)\\s*" + encodeURIComponent(sKey).replace(/[\-\.\+\*]/g, "\\$&") + "\\s*\\=\\s*([^;]*).*$)|^.*$"), "$1")) || null;
}