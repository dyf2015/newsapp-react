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

var UI = (function (_React$Component) {
  _inherits(UI, _React$Component);

  function UI(props) {
    _classCallCheck(this, UI);

    return _possibleConstructorReturn(this, Object.getPrototypeOf(UI).call(this, props));
  }

  _createClass(UI, [{
    key: 'componentDidMount',
    value: function componentDidMount() {
      var _this2 = this;

      this.token1 = _ntesPubsub2.default.subscribe('newsapp:ui:title', function (title) {
        _this2.refs.ui.src = 'docmode://modifytitle/' + encodeURIComponent(title);
      });
      this.token2 = _ntesPubsub2.default.subscribe('newsapp:ui:toolbar', function (show) {
        _this2.refs.ui.src = 'docmode://toolbar/' + show ? 'show' : 'hide';
      });
      this.token3 = _ntesPubsub2.default.subscribe('newsapp:ui:button', function (text, callback) {
        _this2.refs.ui.src = 'docmode://actionbutton/' + encodeURIComponent(text);
        window.__newsapp_browser_actionbutton = function () {
          return callback();
        };
      });
    }
  }, {
    key: 'componentDidUpdate',
    value: function componentDidUpdate() {
      if (this.props.title && this.props.title != document.title) {
        this.refs.ui.src = 'docmode://modifytitle/' + encodeURIComponent(this.props.title);
      }
    }
  }, {
    key: 'componentWillUnmount',
    value: function componentWillUnmount() {
      _ntesPubsub2.default.unsubscribe('newsapp:ui:title', this.token1);
      _ntesPubsub2.default.unsubscribe('newsapp:ui:toolbar', this.token2);
      _ntesPubsub2.default.unsubscribe('newsapp:ui:button', this.token3);
      window.__newsapp_browser_actionbutton = null;
    }
  }, {
    key: 'render',
    value: function render() {
      var style = {
        display: 'none'
      };

      return _react2.default.createElement('iframe', { ref: 'ui', style: style });
    }
  }]);

  return UI;
})(_react2.default.Component);

exports.default = UI;