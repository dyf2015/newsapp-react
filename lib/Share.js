'use strict';

Object.defineProperty(exports, '__esModule', {
  value: true
});

var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ('value' in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

var _get = function get(_x, _x2, _x3) { var _again = true; _function: while (_again) { var object = _x, property = _x2, receiver = _x3; _again = false; if (object === null) object = Function.prototype; var desc = Object.getOwnPropertyDescriptor(object, property); if (desc === undefined) { var parent = Object.getPrototypeOf(object); if (parent === null) { return undefined; } else { _x = parent; _x2 = property; _x3 = receiver; _again = true; desc = parent = undefined; continue _function; } } else if ('value' in desc) { return desc.value; } else { var getter = desc.get; if (getter === undefined) { return undefined; } return getter.call(receiver); } } };

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError('Cannot call a class as a function'); } }

function _inherits(subClass, superClass) { if (typeof superClass !== 'function' && superClass !== null) { throw new TypeError('Super expression must either be null or a function, not ' + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _ntesPubsub = require('ntes-pubsub');

var _ntesPubsub2 = _interopRequireDefault(_ntesPubsub);

var _ObjectAssign = require('./Object.assign');

var _ObjectAssign2 = _interopRequireDefault(_ObjectAssign);

var Share = (function (_React$Component) {
  _inherits(Share, _React$Component);

  function Share(props) {
    _classCallCheck(this, Share);

    _get(Object.getPrototypeOf(Share.prototype), 'constructor', this).call(this, props);
    this.token = null;
    this.state = (0, _ObjectAssign2['default'])({
      wbText: '微博文案',
      wbPhoto: '微博图片',
      wxText: '微信文案',
      wxTitle: '微信标题',
      wxUrl: '微信地址',
      wxPhoto: '微信图片'
    }, this.props);
  }

  _createClass(Share, [{
    key: 'componentDidMount',
    value: function componentDidMount() {
      var _this = this;

      this.token = _ntesPubsub2['default'].subscribe('newsapp:share', function (shareData) {
        _this.setState({
          wbText: shareData.wbText,
          wbPhoto: shareData.wbPhoto,
          wxText: shareData.wxText,
          wxTitle: shareData.wxTitle,
          wxUrl: shareData.wxUrl,
          wxPhoto: shareData.wxPhoto
        }, function () {
          _this.share();
        });
      });
    }
  }, {
    key: 'componentWillUnmount',
    value: function componentWillUnmount() {
      _ntesPubsub2['default'].unsubscribe('newsapp:share', this.token);
    }
  }, {
    key: 'share',
    value: function share(callback) {
      this.refs.iframe.src = "share://0";
      window.__newsapp_share_done = function () {
        return window.__newsapp_share_done = null;
      };
      callback && callback();
    }
  }, {
    key: 'render',
    value: function render() {
      var style = {
        display: 'none !important'
      };
      return _react2['default'].createElement(
        'div',
        { style: style },
        _react2['default'].createElement(
          'div',
          { style: style, id: '__newsapp_sharetext' },
          this.state.wbText
        ),
        _react2['default'].createElement(
          'div',
          { style: style, id: '__newsapp_sharephotourl' },
          this.state.wbPhoto
        ),
        _react2['default'].createElement(
          'div',
          { style: style, id: '__newsapp_sharewxtext' },
          this.state.wxText
        ),
        _react2['default'].createElement(
          'div',
          { style: style, id: '__newsapp_sharewxtitle' },
          this.state.wxTitle
        ),
        _react2['default'].createElement(
          'div',
          { style: style, id: '__newsapp_sharewxurl' },
          this.state.wxUrl
        ),
        _react2['default'].createElement(
          'div',
          { style: style, id: '__newsapp_sharewxthumburl' },
          this.state.wxPhoto
        ),
        _react2['default'].createElement('iframe', { ref: 'iframe', style: style })
      );
    }
  }], [{
    key: 'propTypes',
    value: {
      wbText: _react2['default'].PropTypes.string,
      wbPhoto: _react2['default'].PropTypes.string,
      wxText: _react2['default'].PropTypes.string,
      wxTitle: _react2['default'].PropTypes.string,
      wxUrl: _react2['default'].PropTypes.string,
      wxPhoto: _react2['default'].PropTypes.string
    },
    enumerable: true
  }]);

  return Share;
})(_react2['default'].Component);

exports['default'] = Share;
module.exports = exports['default'];