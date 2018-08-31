"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _react = _interopRequireWildcard(require("react"));

var _draftJs = require("draft-js");

var _styles = require("./styles");

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) { var desc = Object.defineProperty && Object.getOwnPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : {}; if (desc.get || desc.set) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } } newObj.default = obj; return newObj; } }

function _typeof(obj) { if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

function _possibleConstructorReturn(self, call) { if (call && (_typeof(call) === "object" || typeof call === "function")) { return call; } return _assertThisInitialized(self); }

function _getPrototypeOf(o) { _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf : function _getPrototypeOf(o) { return o.__proto__ || Object.getPrototypeOf(o); }; return _getPrototypeOf(o); }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function"); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, writable: true, configurable: true } }); if (superClass) _setPrototypeOf(subClass, superClass); }

function _setPrototypeOf(o, p) { _setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return _setPrototypeOf(o, p); }

function _assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

var Toolbar =
/*#__PURE__*/
function (_Component) {
  _inherits(Toolbar, _Component);

  function Toolbar() {
    var _getPrototypeOf2;

    var _this;

    _classCallCheck(this, Toolbar);

    for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    _this = _possibleConstructorReturn(this, (_getPrototypeOf2 = _getPrototypeOf(Toolbar)).call.apply(_getPrototypeOf2, [this].concat(args)));

    _defineProperty(_assertThisInitialized(_assertThisInitialized(_this)), "state", {
      isVisible: false,
      modalVisible: false,
      modal: null,
      position: {}
    });

    _defineProperty(_assertThisInitialized(_assertThisInitialized(_this)), "onVisibilityChanged", function (isVisible) {
      var toolbarHeightOffset = 55;
      var selectionRect = isVisible ? (0, _draftJs.getVisibleSelectionRect)(window) : undefined;
      if (selectionRect === undefined || selectionRect === null) return;
      var top = selectionRect.top === undefined ? 0 : selectionRect.top + window.scrollY - toolbarHeightOffset;
      var left = selectionRect.left === undefined ? 0 : selectionRect.left + window.scrollX + selectionRect.width / 2;
      var position = {
        top: top,
        left: left
      };

      _this.setState({
        position: position
      });
    });

    _defineProperty(_assertThisInitialized(_assertThisInitialized(_this)), "openModal", function (type) {
      var modal = _this.props.getModalByType(type);

      _this.setState({
        modal: modal
      }, function () {
        _this.setState({
          modalVisible: true
        });
      });
    });

    _defineProperty(_assertThisInitialized(_assertThisInitialized(_this)), "closeModal", function () {
      _this.setState({
        modalVisible: false
      });
    });

    return _this;
  }

  _createClass(Toolbar, [{
    key: "componentWillMount",
    value: function componentWillMount() {
      this.props.store.subscribeToItem('isVisible', this.onVisibilityChanged);
    }
  }, {
    key: "componentWillUnmount",
    value: function componentWillUnmount() {
      this.props.store.unsubscribeFromItem('isVisible', this.onVisibilityChanged);
    }
  }, {
    key: "render",
    value: function render() {
      var _this2 = this;

      var store = this.props.store;
      var _this$state = this.state,
          modal = _this$state.modal,
          modalVisible = _this$state.modalVisible,
          position = _this$state.position;
      var Modal = modal;
      var getEditorState = store.getItem('getEditorState');
      var editorState = getEditorState();
      var show = true;

      if (editorState.getSelection().isCollapsed()) {
        show = false;
      }

      return _react.default.createElement(_styles.ToolbarWrapper, {
        show: show,
        style: position
      }, modalVisible && _react.default.createElement(Modal, {
        getEditorState: store.getItem('getEditorState'),
        setEditorState: store.getItem('setEditorState'),
        closeModal: this.closeModal,
        openModal: this.openModal
      }), !modalVisible && this.props.structure.map(function (Component, index) {
        return _react.default.createElement(Component, {
          key: index,
          getEditorState: store.getItem('getEditorState'),
          setEditorState: store.getItem('setEditorState'),
          closeModal: _this2.closeModal,
          openModal: _this2.openModal
        });
      }));
    }
  }]);

  return Toolbar;
}(_react.Component);

var _default = Toolbar;
exports.default = _default;