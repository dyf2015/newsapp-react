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

var Encrypt = (function (_React$Component) {
  _inherits(Encrypt, _React$Component);

  function Encrypt(props) {
    _classCallCheck(this, Encrypt);

    return _possibleConstructorReturn(this, Object.getPrototypeOf(Encrypt).call(this, props));
  }

  _createClass(Encrypt, [{
    key: 'componentDidMount',
    value: function componentDidMount() {
      var _this2 = this;

      this.token = _ntesPubsub2.default.subscribe('newsapp:encrypt', function (encryptedText, callback) {
        encryptedText = encodeURIComponent(encryptedText);
        _this2.callback = callback;
        if (_platform2.default.isIos) {
          _this2.refs.encrypt.src = "encrypt://" + encryptedText;
        } else if (window.extra && window.extra.__newsapp_encrypt) {
          _this2.callback(window.extra.__newsapp_encrypt(encryptedText));
        }
      });
      window.__newsapp_encrypt_done = function (result) {
        return _this2.callback(result);
      };
    }
  }, {
    key: 'componentWillUnmount',
    value: function componentWillUnmount() {
      window.__newsapp_encrypt_done = null;
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
        _react2.default.createElement('iframe', { ref: 'encrypt' })
      );
    }
  }]);

  return Encrypt;
})(_react2.default.Component);

exports.default = Encrypt;