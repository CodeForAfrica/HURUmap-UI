"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _react = require("react");

var _reactHooks = require("@apollo/react-hooks");

var _buildProfileQuery = _interopRequireDefault(require("./buildProfileQuery"));

var _useVisualLoader = _interopRequireDefault(require("../useVisualLoader"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _objectWithoutProperties(source, excluded) { if (source == null) return {}; var target = _objectWithoutPropertiesLoose(source, excluded); var key, i; if (Object.getOwnPropertySymbols) { var sourceSymbolKeys = Object.getOwnPropertySymbols(source); for (i = 0; i < sourceSymbolKeys.length; i++) { key = sourceSymbolKeys[i]; if (excluded.indexOf(key) >= 0) continue; if (!Object.prototype.propertyIsEnumerable.call(source, key)) continue; target[key] = source[key]; } } return target; }

function _objectWithoutPropertiesLoose(source, excluded) { if (source == null) return {}; var target = {}; var sourceKeys = Object.keys(source); var key, i; for (i = 0; i < sourceKeys.length; i++) { key = sourceKeys[i]; if (excluded.indexOf(key) >= 0) continue; target[key] = source[key]; } return target; }

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
      populationTables = _ref.populationTables;
  var client = (0, _reactHooks.useApolloClient)();

  var _useState = (0, _react.useState)({
    isLoading: true
  }),
      _useState2 = _slicedToArray(_useState, 2),
      profiles = _useState2[0],
      setProfiles = _useState2[1];

  (0, _react.useEffect)(function () {
    if (geoId) {
      _asyncToGenerator(
      /*#__PURE__*/
      regeneratorRuntime.mark(function _callee() {
        var query, _ref3, _ref3$data, profile, populations, population, _ref4, parent, comparison, _ref5, _ref5$data, g, pps, ppl;

        return regeneratorRuntime.wrap(function _callee$(_context) {
          while (1) {
            switch (_context.prev = _context.next) {
              case 0:
                setProfiles({
                  isLoading: true
                });
                query = (0, _buildProfileQuery.default)(populationTables || []);
                _context.next = 4;
                return client.query({
                  query: query,
                  variables: {
                    geoCode: geoId.split('-')[1],
                    geoLevel: geoId.split('-')[0]
                  }
                });

              case 4:
                _ref3 = _context.sent;
                _ref3$data = _ref3.data;
                profile = _ref3$data.geo;
                populations = _objectWithoutProperties(_ref3$data, ["geo"]);
                population = Object.values(populations).find(function (p) {
                  return p.nodes.length > 0;
                });
                profile.totalPopulation = population ? population.nodes.reduce(function (a, b) {
                  return a + b.total;
                }, 0) : 0;
                _context.next = 12;
                return client.query({
                  query: query,
                  variables: {
                    geoCode: profile.parentCode,
                    geoLevel: profile.parentLevel
                  }
                });

              case 12:
                _ref4 = _context.sent;
                parent = _ref4.data.geo;

                if (!comparisonGeoId) {
                  _context.next = 24;
                  break;
                }

                _context.next = 17;
                return client.query({
                  query: query,
                  variables: {
                    geoCode: comparisonGeoId.split('-')[1],
                    geoLevel: comparisonGeoId.split('-')[0],
                    countryCode: comparisonGeoId.split('-')[1].slice(0, 2)
                  }
                });

              case 17:
                _ref5 = _context.sent;
                _ref5$data = _ref5.data;
                g = _ref5$data.geo;
                pps = _objectWithoutProperties(_ref5$data, ["geo"]);
                comparison = g;
                ppl = Object.values(pps).find(function (p) {
                  return p.nodes.length > 0;
                });
                comparison.totalPopulation = ppl ? ppl.nodes.reduce(function (a, b) {
                  return a + b.total;
                }, 0) : 0;

              case 24:
                setProfiles({
                  isLoading: false,
                  profile: profile,
                  parent: parent,
                  comparison: comparison
                });

              case 25:
              case "end":
                return _context.stop();
            }
          }
        }, _callee);
      }))();
    }
  }, [client, geoId, comparisonGeoId, populationTables]);
  var chartData = (0, _useVisualLoader.default)({
    geoId: geoId,
    comparisonGeoId: comparisonGeoId,
    visuals: visuals,
    parent: profiles.parent
  });
  return {
    profiles: profiles,
    chartData: chartData
  };
};

exports.default = _default;