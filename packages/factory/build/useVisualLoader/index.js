"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _react = require("react");

var _reactHooks = require("@apollo/react-hooks");

var _buildVisualsQuery = _interopRequireDefault(require("./buildVisualsQuery"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { Promise.resolve(value).then(_next, _throw); } }

function _asyncToGenerator(fn) { return function () { var self = this, args = arguments; return new Promise(function (resolve, reject) { var gen = fn.apply(self, args); function _next(value) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value); } function _throw(err) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err); } _next(undefined); }); }; }

function _slicedToArray(arr, i) { return _arrayWithHoles(arr) || _iterableToArrayLimit(arr, i) || _nonIterableRest(); }

function _nonIterableRest() { throw new TypeError("Invalid attempt to destructure non-iterable instance"); }

function _iterableToArrayLimit(arr, i) { if (!(Symbol.iterator in Object(arr) || Object.prototype.toString.call(arr) === "[object Arguments]")) { return; } var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"] != null) _i["return"](); } finally { if (_d) throw _e; } } return _arr; }

function _arrayWithHoles(arr) { if (Array.isArray(arr)) return arr; }

var _default = function _default(_ref) {
  var geoId = _ref.geoId,
      comparisonGeoId = _ref.comparisonGeoId,
      visuals = _ref.visuals,
      parent = _ref.parent;
  var client = (0, _reactHooks.useApolloClient)();

  var _useState = (0, _react.useState)({
    isLoading: true
  }),
      _useState2 = _slicedToArray(_useState, 2),
      visualsData = _useState2[0],
      setVisualsData = _useState2[1];

  (0, _react.useEffect)(function () {
    if (visuals && visuals.length) {
      _asyncToGenerator(
      /*#__PURE__*/
      regeneratorRuntime.mark(function _callee() {
        var _ref3, profileVisualsData, comparisonVisualsData, _ref4, data;

        return regeneratorRuntime.wrap(function _callee$(_context) {
          while (1) {
            switch (_context.prev = _context.next) {
              case 0:
                setVisualsData({
                  isLoading: true
                });
                _context.next = 3;
                return client.query({
                  query: (0, _buildVisualsQuery.default)(visuals, parent),
                  variables: {
                    geoCode: geoId.split('-')[1],
                    geoLevel: geoId.split('-')[0],
                    countryCode: geoId.split('-')[1].slice(0, 2)
                  }
                });

              case 3:
                _ref3 = _context.sent;
                profileVisualsData = _ref3.data;

                if (!comparisonGeoId) {
                  _context.next = 11;
                  break;
                }

                _context.next = 8;
                return client.query({
                  query: (0, _buildVisualsQuery.default)(visuals, parent),
                  variables: {
                    geoCode: comparisonGeoId.split('-')[1],
                    geoLevel: comparisonGeoId.split('-')[0],
                    countryCode: comparisonGeoId.split('-')[1].slice(0, 2)
                  }
                });

              case 8:
                _ref4 = _context.sent;
                data = _ref4.data;
                comparisonVisualsData = data;

              case 11:
                setVisualsData({
                  isLoading: false,
                  profileVisualsData: profileVisualsData,
                  comparisonVisualsData: comparisonVisualsData
                });

              case 12:
              case "end":
                return _context.stop();
            }
          }
        }, _callee);
      }))();
    }
  }, [client, comparisonGeoId, geoId, parent, visuals]);
  return visualsData;
};

exports.default = _default;