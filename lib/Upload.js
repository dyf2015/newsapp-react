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

var Upload = (function (_React$Component) {
  _inherits(Upload, _React$Component);

  function Upload(props) {
    _classCallCheck(this, Upload);

    var _this = _possibleConstructorReturn(this, Object.getPrototypeOf(Upload).call(this, props));

    _this.token = null;
    _this.isAndroid = !!navigator.userAgent.match(/android/ig);
    _this.fileChanged = _this.fileChanged.bind(_this);
    _this.run = _this.run.bind(_this);
    _this.callback = function () {};
    return _this;
  }

  _createClass(Upload, [{
    key: 'componentDidMount',
    value: function componentDidMount() {
      var _this2 = this;

      this.token = _ntesPubsub2.default.subscribe('newsapp:upload', function (callback) {
        if (callback) {
          _this2.callback = callback;
        }
        _this2.run();
      });

      window.iosReturn = function (imgUrl) {
        _this2.callback(imgUrl);
      };
      window.__newsapp_upload_image_done = function (imgUrl) {
        _this2.callback(imgUrl);
      };
    }
  }, {
    key: 'componentWillUnmount',
    value: function componentWillUnmount() {
      _ntesPubsub2.default.unsubscribe('newsapp:upload', this.token);
      window.__newsapp_upload_image_done = null;
      window.iosReturn = null;
    }
  }, {
    key: 'fileChanged',
    value: function fileChanged() {
      var file = this.refs.inputFile.files[0];
      if (file && /image\/\w+/.test(file.type)) {
        _ntesPubsub2.default.publish('loading:start');
        this.refs.form.submit();
      }
    }
  }, {
    key: 'run',
    value: function run() {
      if (this.isAndroid) {
        this.refs.iframe.src = 'uploadimage://album/';
      } else {
        this.refs.inputFile.click();
      }
    }
  }, {
    key: 'render',
    value: function render() {
      var style = {
        display: 'none !important'
      };
      if (this.isAndroid) {
        return _react2.default.createElement('iframe', { ref: 'iframe', style: style });
      } else {
        return _react2.default.createElement(
          'div',
          { style: style },
          _react2.default.createElement('iframe', { ref: 'iosupload', name: 'iosupload', style: style }),
          _react2.default.createElement(
            'form',
            { ref: 'form', action: 'http://c.3g.163.com/uc/photo/upload?rt=' + this.props.returnUrl + '&size=' + this.props.width + 'x' + this.props.height + 'x0', target: 'iosupload', encType: 'multipart/form-data', method: 'POST' },
            _react2.default.createElement('input', { type: 'file', accept: 'image/*', name: 'abc', ref: 'inputFile', onChange: this.fileChanged.bind(this) })
          )
        );
      }
    }
  }]);

  return Upload;
})(_react2.default.Component);

Upload.propTypes = {
  width: _react2.default.PropTypes.number,
  height: _react2.default.PropTypes.number,
  returnUrl: _react2.default.PropTypes.string.isRequired
};
exports.default = Upload;