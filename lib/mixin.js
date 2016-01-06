/*
 * based on https://gist.github.com/sebmarkbage/fac0830dbb13ccbff596
 * by Sebastian Markbåge
 */

'use strict';

var _inherits = require('babel-runtime/helpers/inherits')['default'];

var _classCallCheck = require('babel-runtime/helpers/class-call-check')['default'];

var _Object$defineProperty = require('babel-runtime/core-js/object/define-property')['default'];

var _Object$assign = require('babel-runtime/core-js/object/assign')['default'];

var _interopRequireDefault = require('babel-runtime/helpers/interop-require-default')['default'];

_Object$defineProperty(exports, '__esModule', {
  value: true
});

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var noop = function noop() {
  return null;
};
var trueNoop = function trueNoop() {
  return true;
};
var es6ify = function es6ify(mixin) {
  if (typeof mixin === 'function') {
    // mixin is already es6 style
    return mixin;
  }
  return function (Base) {
    // mixin is old-react style plain object
    // convert to ES6 class

    var NewClass = (function (_Base) {
      function NewClass() {
        _classCallCheck(this, NewClass);

        if (_Base != null) {
          _Base.apply(this, arguments);
        }
      }

      _inherits(NewClass, _Base);

      return NewClass;
    })(Base);

    var clonedMixin = _Object$assign({}, mixin);
    // These React properties are defined as ES7 class static properties
    ['childContextTypes', 'contextTypes', 'defaultProps', 'propTypes'].forEach(function (m) {
      NewClass[m] = clonedMixin[m];
      delete clonedMixin[m];
    });
    _Object$assign(NewClass.prototype, clonedMixin);

    return NewClass;
  };
};

var mixin = function mixin() {
  for (var _len = arguments.length, mixins = Array(_len), _key = 0; _key < _len; _key++) {
    mixins[_key] = arguments[_key];
  }

  var Base = (function (_React$Component) {
    function Base() {
      _classCallCheck(this, Base);

      if (_React$Component != null) {
        _React$Component.apply(this, arguments);
      }
    }

    _inherits(Base, _React$Component);

    return Base;
  })(_react2['default'].Component);

  Base.prototype.shouldComponentUpdate = trueNoop;

  // No-ops so we need not check before calling super()
  ['componentWillMount', 'componentDidMount', 'componentWillReceiveProps', 'componentWillUpdate', 'componentDidUpdate', 'componentWillUnmount', 'render'].forEach(function (m) {
    return Base.prototype[m] = noop;
  });

  mixins.reverse();

  mixins.forEach(function (mixin) {
    return Base = es6ify(mixin)(Base);
  });
  return Base;
};

exports['default'] = mixin;
module.exports = exports['default'];