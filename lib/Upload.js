'use strict';

Object.defineProperty(exports, '__esModule', {
  value: true
});

var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ('value' in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

var _get = function get(_x, _x2, _x3) { var _again = true; _function: while (_again) { var object = _x, property = _x2, receiver = _x3; desc = parent = getter = undefined; _again = false; if (object === null) object = Function.prototype; var desc = Object.getOwnPropertyDescriptor(object, property); if (desc === undefined) { var parent = Object.getPrototypeOf(object); if (parent === null) { return undefined; } else { _x = parent; _x2 = property; _x3 = receiver; _again = true; continue _function; } } else if ('value' in desc) { return desc.value; } else { var getter = desc.get; if (getter === undefined) { return undefined; } return getter.call(receiver); } } };

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError('Cannot call a class as a function'); } }

function _inherits(subClass, superClass) { if (typeof superClass !== 'function' && superClass !== null) { throw new TypeError('Super expression must either be null or a function, not ' + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _ntesPubsub = require('ntes-pubsub');

var _ntesPubsub2 = _interopRequireDefault(_ntesPubsub);

var Upload = (function (_React$Component) {
  _inherits(Upload, _React$Component);

  function Upload(props) {
    _classCallCheck(this, Upload);

    _get(Object.getPrototypeOf(Upload.prototype), 'constructor', this).call(this, props);
    this.token = null;
    this.isAndroid = !!navigator.userAgent.match(/android/ig);
    this.fileChanged = this.fileChanged.bind(this);
    this.run = this.run.bind(this);
    this.callback = function () {};
  }

  _createClass(Upload, [{
    key: 'componentDidMount',
    value: function componentDidMount() {
      var _this = this;

      this.token = _ntesPubsub2['default'].subscribe('newsapp:upload', function (callback) {
        if (callback) {
          _this.callback = callback;
        }
        _this.run();
      });

      window.iosReturn = function (imgUrl) {
        _this.callback(imgUrl);
      };
      window.__newsapp_upload_image_done = function (imgUrl) {
        _this.callback(imgUrl);
      };
    }
  }, {
    key: 'componentWillUnmount',
    value: function componentWillUnmount() {
      _ntesPubsub2['default'].unsubscribe('newsapp:upload', this.token);
      window.__newsapp_upload_image_done = null;
      window.iosReturn = null;
    }
  }, {
    key: 'fileChanged',
    value: function fileChanged() {
      var file = this.refs.inputFile.files[0];
      if (file && /image\/\w+/.test(file.type)) {
        _ntesPubsub2['default'].publish('loading:start');
        this.refs.form.submit();
      }
    }
  }, {
    key: 'run',
    value: function run() {
      console.log('Start to choose an image.');
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
        return _react2['default'].createElement('iframe', { ref: 'iframe', style: style });
      } else {
        return _react2['default'].createElement(
          'div',
          { style: style },
          _react2['default'].createElement('iframe', { ref: 'iosupload', name: 'iosupload', style: style }),
          _react2['default'].createElement(
            'form',
            { ref: 'form', action: this.props.returnUrl, target: 'iosupload', encType: 'multipart/form-data', method: 'POST' },
            _react2['default'].createElement('input', { type: 'file', accept: 'image/*', name: 'abc', ref: 'inputFile', onChange: this.fileChanged.bind(this) })
          )
        );
      }
    }
  }], [{
    key: 'propTypes',
    value: {
      width: _react2['default'].PropTypes.number,
      height: _react2['default'].PropTypes.number,
      returnUrl: _react2['default'].PropTypes.string.isRequired
    },
    enumerable: true
  }]);

  return Upload;
})(_react2['default'].Component);

exports.Upload = Upload;