'use strict';

var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _ntesPubsub = require('ntes-pubsub');

var _ntesPubsub2 = _interopRequireDefault(_ntesPubsub);

var _objectAssign = require('object-assign');

var _objectAssign2 = _interopRequireDefault(_objectAssign);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var Share = (function (_React$Component) {
  _inherits(Share, _React$Component);

  function Share(props) {
    _classCallCheck(this, Share);

    var _this = _possibleConstructorReturn(this, Object.getPrototypeOf(Share).call(this, props));

    _this.token = null;
    _this.state = (0, _objectAssign2.default)({
      wbText: '微博文案',
      wbPhoto: '微博图片',
      wxText: '微信文案',
      wxTitle: '微信标题',
      wxUrl: '微信地址',
      wxPhoto: '微信图片'
    }, _this.props);
    _this.share = _this.share.bind(_this);
    return _this;
  }

  _createClass(Share, [{
    key: 'componentDidMount',
    value: function componentDidMount() {
      var _this2 = this;

      this.token = _ntesPubsub2.default.subscribe('newsapp:share', function (shareData) {
        _this2.setState({
          wbText: shareData.wbText,
          wbPhoto: shareData.wbPhoto,
          wxText: shareData.wxText,
          wxTitle: shareData.wxTitle,
          wxUrl: shareData.wxUrl,
          wxPhoto: shareData.wxPhoto
        }, function () {
          _this2.share();
        });
      });
    }
  }, {
    key: 'componentWillUnmount',
    value: function componentWillUnmount() {
      _ntesPubsub2.default.unsubscribe('newsapp:share', this.token);
    }
  }, {
    key: 'share',
    value: function share(callback) {
      window.__newsapp_share_done = function (result) {
        window.__newsapp_share_done = null;
        callback && callback();
      };
      this.refs.iframe.src = "share://0";
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
        _react2.default.createElement(
          'div',
          { style: style, id: '__newsapp_sharetext' },
          this.state.wbText
        ),
        _react2.default.createElement(
          'div',
          { style: style, id: '__newsapp_sharephotourl' },
          this.state.wbPhoto
        ),
        _react2.default.createElement(
          'div',
          { style: style, id: '__newsapp_sharewxtext' },
          this.state.wxText
        ),
        _react2.default.createElement(
          'div',
          { style: style, id: '__newsapp_sharewxtitle' },
          this.state.wxTitle
        ),
        _react2.default.createElement(
          'div',
          { style: style, id: '__newsapp_sharewxurl' },
          this.state.wxUrl
        ),
        _react2.default.createElement(
          'div',
          { style: style, id: '__newsapp_sharewxthumburl' },
          this.state.wxPhoto
        ),
        _react2.default.createElement('iframe', { ref: 'iframe', style: style })
      );
    }
  }]);

  return Share;
})(_react2.default.Component);

Share.propTypes = {
  wbText: _react2.default.PropTypes.string,
  wbPhoto: _react2.default.PropTypes.string,
  wxText: _react2.default.PropTypes.string,
  wxTitle: _react2.default.PropTypes.string,
  wxUrl: _react2.default.PropTypes.string,
  wxPhoto: _react2.default.PropTypes.string
};
exports.default = Share;