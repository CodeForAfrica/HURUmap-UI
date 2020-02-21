"use strict";

function _typeof(obj) { "@babel/helpers - typeof"; if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _react = _interopRequireWildcard(require("react"));

var _core = require("@material-ui/core");

var _victory = require("victory");

var _LineChart = _interopRequireDefault(require("@hurumap/charts/LineChart"));

var _BulletChart = _interopRequireDefault(require("@hurumap/charts/BulletChart"));

var _BarChart = _interopRequireDefault(require("@hurumap/charts/BarChart"));

var _PieChart = _interopRequireDefault(require("@hurumap/charts/PieChart"));

var _NestedProportionalAreaChart = _interopRequireDefault(require("@hurumap/charts/NestedProportionalAreaChart"));

var _NumberVisuals = _interopRequireDefault(require("@hurumap/charts/NumberVisuals"));

var _propTypes = _interopRequireDefault(require("@hurumap/charts/propTypes"));

var _withVictoryTheme = _interopRequireDefault(require("@hurumap/charts/styles/withVictoryTheme"));

var _aggregateData = _interopRequireWildcard(require("./utils/aggregateData"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _getRequireWildcardCache() { if (typeof WeakMap !== "function") return null; var cache = new WeakMap(); _getRequireWildcardCache = function _getRequireWildcardCache() { return cache; }; return cache; }

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } if (obj === null || _typeof(obj) !== "object" && typeof obj !== "function") { return { default: obj }; } var cache = _getRequireWildcardCache(); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj.default = obj; if (cache) { cache.set(obj, newObj); } return newObj; }

function _extends() { _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends.apply(this, arguments); }

function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(Object(source), true).forEach(function (key) { _defineProperty(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

function _slicedToArray(arr, i) { return _arrayWithHoles(arr) || _iterableToArrayLimit(arr, i) || _nonIterableRest(); }

function _nonIterableRest() { throw new TypeError("Invalid attempt to destructure non-iterable instance"); }

function _iterableToArrayLimit(arr, i) { if (!(Symbol.iterator in Object(arr) || Object.prototype.toString.call(arr) === "[object Arguments]")) { return; } var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"] != null) _i["return"](); } finally { if (_d) throw _e; } } return _arr; }

function _arrayWithHoles(arr) { if (Array.isArray(arr)) return arr; }

function _objectWithoutProperties(source, excluded) { if (source == null) return {}; var target = _objectWithoutPropertiesLoose(source, excluded); var key, i; if (Object.getOwnPropertySymbols) { var sourceSymbolKeys = Object.getOwnPropertySymbols(source); for (i = 0; i < sourceSymbolKeys.length; i++) { key = sourceSymbolKeys[i]; if (excluded.indexOf(key) >= 0) continue; if (!Object.prototype.propertyIsEnumerable.call(source, key)) continue; target[key] = source[key]; } } return target; }

function _objectWithoutPropertiesLoose(source, excluded) { if (source == null) return {}; var target = {}; var sourceKeys = Object.keys(source); var key, i; for (i = 0; i < sourceKeys.length; i++) { key = sourceKeys[i]; if (excluded.indexOf(key) >= 0) continue; target[key] = source[key]; } return target; }

var DOWNLOAD_HIDDEN_CLASSNAME = 'Download--hidden';

var ChartFactory = _react.default.memo(function (_ref) {
  var theme = _ref.theme,
      _ref$definition = _ref.definition,
      id = _ref$definition.id,
      visualType = _ref$definition.type,
      typeProps = _ref$definition.typeProps,
      label = _ref$definition.label,
      _ref$definition$refer = _ref$definition.reference;
  _ref$definition$refer = _ref$definition$refer === void 0 ? {} : _ref$definition$refer;

  var propReferenceLabel = _ref$definition$refer.label,
      aggregate = _ref$definition.aggregate,
      unique = _ref$definition.unique,
      subtitle = _ref$definition.subtitle,
      description = _ref$definition.description,
      _ref$definition$local = _ref$definition.locale,
      locale = _ref$definition$local === void 0 ? 'en-GB' : _ref$definition$local,
      _ref$definition$custo = _ref$definition.customUnit,
      customUnit = _ref$definition$custo === void 0 ? '' : _ref$definition$custo,
      unit = _ref$definition.unit,
      numberFormat = _objectWithoutProperties(_ref$definition, ["id", "type", "typeProps", "label", "reference", "aggregate", "unique", "subtitle", "description", "locale", "customUnit", "unit"]),
      disableShowMore = _ref.disableShowMore,
      data = _ref.data,
      isComparison = _ref.isComparison,
      comparisonData = _ref.comparisonData,
      referenceData = _ref.referenceData,
      profiles = _ref.profiles;

  var _useState = (0, _react.useState)(null),
      _useState2 = _slicedToArray(_useState, 2),
      rootRef = _useState2[0],
      setRootRef = _useState2[1];

  var _ref2 = typeProps || {},
      horizontal = _ref2.horizontal,
      widthProp = _ref2.width,
      heightProp = _ref2.height,
      offsetProp = _ref2.offset,
      paddingProp = _ref2.padding,
      chartProps = _objectWithoutProperties(_ref2, ["horizontal", "width", "height", "offset", "padding"]);

  var key = id || Math.random().toString(36).substring(2) + Date.now().toString(36);

  var _useState3 = (0, _react.useState)(false),
      _useState4 = _slicedToArray(_useState3, 2),
      showMore = _useState4[0],
      setShowMore = _useState4[1];

  var numberFormatter = (0, _react.useRef)(function () {
    try {
      var formatter = new Intl.NumberFormat(locale, _objectSpread({
        maximumFractionDigits: 2
      }, numberFormat));
      return formatter;
    } catch (e) {
      return new Intl.NumberFormat(locale);
    }
  }()).current;
  var format = (0, _react.useCallback)(function (value) {
    /**
     * Since `notation: compact` is experimental as noted here:
     *  https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/NumberFormat
     * It is only available in Chrome 77+ :
     *  https://v8.dev/features/intl-numberformat#notation
     *
     * Manually compact the numbers until this feature is available.
     */
    var formatValue = value;
    var compactUnit = '';

    if (value > Math.pow(10, 12)) {
      compactUnit = 'T';
      formatValue = value / Math.pow(10, 12);
    } else if (value > Math.pow(10, 9)) {
      compactUnit = 'B';
      formatValue = value / Math.pow(10, 9);
    } else if (value > Math.pow(10, 6)) {
      compactUnit = 'M';
      formatValue = value / Math.pow(10, 6);
    } else {} //

    /**
     * `style: percent` expects a ratio
     */


    if (numberFormat.style === 'percent') {
      formatValue /= 100;
    }

    return "".concat(numberFormatter.format(formatValue)).concat(compactUnit, " ").concat(customUnit).trim(); // in case customUnit is empty
  }, [customUnit, numberFormat.style, numberFormatter]);
  var primaryData = (0, _react.useMemo)(function () {
    var labels = function labels(_ref3) {
      var x = _ref3.x,
          y = _ref3.y;
      var separator = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : ': ';
      var formatedX = x ? "".concat(x).concat(separator) : '';
      return "".concat(formatedX).concat(format(y));
    };

    if (visualType === 'grouped_column' || visualType === 'line' && data[0] && data[0].groupBy) {
      /**
       * Group the data based on groupBy
       * Then aggregate the groupped data
       */
      var groupedData = (0, _aggregateData.groupData)(data);

      if (groupedData.length) {
        /**
         * Change `x` to be the `groupBy` value
         * to plot group labels on the dependent axis
         */
        groupedData = groupedData.map(function (g) {
          return g.map(function (gd) {
            return _objectSpread({}, gd, {
              tooltip: labels(gd),
              x: gd.groupBy
            });
          });
        });
        /**
         * Reverse grouped data
         * since victory plots inversely
         */

        groupedData = groupedData[0].map(function (_c, i) {
          return groupedData.map(function (r) {
            return r[i];
          });
        });
      }

      return groupedData;
    }

    if (['column', 'line', 'bullet'].includes(visualType)) {
      var computedData = (0, _aggregateData.default)(aggregate, // Bullet charts only use first two data
      visualType === 'bullet' ? data.slice(0, 2) : data);
      return computedData.map(function (cD) {
        return _objectSpread({}, cD, {
          tooltip: labels(cD)
        });
      });
    }

    if (visualType === 'pie') {
      return (0, _aggregateData.default)(aggregate, data).map(function (d) {
        return _objectSpread({}, d, {
          donutLabel: labels(d, '\n'),
          label: labels(d),
          name: d.x,
          tooltip: labels(d)
        });
      });
    }

    return [];
  }, [aggregate, data, format, visualType]);
  var calculations = (0, _react.useMemo)(function () {
    switch (visualType) {
      case 'bullet':
      case 'number':
      case 'square_nested_proportional_area':
      case 'circle_nested_proportional_area':
        return {};

      case 'pie':
        return {
          width: widthProp || theme.pie.width,
          height: heightProp || theme.pie.height
        };

      case 'grouped_column':
        {
          var barCount = primaryData[0].length;
          var offset = offsetProp || theme.bar.offset;
          var padding = paddingProp ? _victory.Helpers.getPadding({
            padding: paddingProp
          }) : _victory.Helpers.getPadding(theme.bar);
          var paddingSize = horizontal ? padding.top + padding.bottom : padding.left + padding.right;

          var _theme$bar$domainPadd = _slicedToArray(theme.bar.domainPadding.x, 2),
              x0 = _theme$bar$domainPadd[0],
              x1 = _theme$bar$domainPadd[1];

          var domainPadding = {
            x: [x0 * primaryData.length, x1 * primaryData.length]
          };
          var rootWidth = rootRef && rootRef.getBoundingClientRect().width;
          var adjustedRootWidth = rootRef && rootWidth - (theme.axis.labelWidth || 0);
          var height = heightProp || theme.bar.height;
          var fullSize;
          var dataCount;
          var computedSize; // eslint-disable-next-line no-plusplus

          for (dataCount = barCount; dataCount > 0; --dataCount) {
            computedSize = primaryData.length * dataCount * offset + paddingSize + domainPadding.x[0] + domainPadding.x[1];

            if (!fullSize) {
              fullSize = computedSize;
            }

            if (!adjustedRootWidth || showMore) {
              break;
            }

            if (horizontal && computedSize < height || !horizontal && computedSize < adjustedRootWidth) {
              break;
            }
          }

          var width = horizontal || computedSize > adjustedRootWidth ? adjustedRootWidth : computedSize;
          var computedHeight = horizontal || showMore ? computedSize : height;
          return {
            width: width,
            offset: offset,
            dataCount: dataCount,
            domainPadding: domainPadding,
            height: computedHeight,
            enableShowMore: Boolean(height) && ( // It can't fit the desired height
            // or
            // It can't fit the dynamic width
            fullSize > height || fullSize > adjustedRootWidth)
          };
        }

      case 'column':
        {
          var _barCount = isComparison ? 2 : 1;

          var _offset = offsetProp || theme.bar.offset;

          var _theme$bar$domainPadd2 = _slicedToArray(theme.bar.domainPadding.x, 2),
              _x = _theme$bar$domainPadd2[0],
              _x2 = _theme$bar$domainPadd2[1];

          var _domainPadding = {
            x: [_x * _barCount, _x2 * _barCount]
          };

          var _padding = paddingProp ? _victory.Helpers.getPadding({
            padding: paddingProp
          }) : _victory.Helpers.getPadding(theme.bar);

          var _paddingSize = horizontal ? _padding.top + _padding.bottom : _padding.left + _padding.right;

          var _rootWidth = rootRef && rootRef.getBoundingClientRect().width;

          var _adjustedRootWidth = _rootWidth && _rootWidth - (theme.axis.labelWidth || 0);

          var _height = heightProp || theme.bar.height;

          var _fullSize;

          var _dataCount;

          var _computedSize; // eslint-disable-next-line no-plusplus


          for (_dataCount = primaryData.length; _dataCount > 0; --_dataCount) {
            _computedSize = _dataCount * _barCount * _offset + _paddingSize + _domainPadding.x[0] + _domainPadding.x[1] + ( // Bug when 2 bars only
            _dataCount === 2 ? _offset : 0);

            if (!_fullSize) {
              _fullSize = _computedSize;
            }

            if (!_adjustedRootWidth || showMore) {
              break;
            }

            if (horizontal ? _computedSize < _height : _computedSize < _adjustedRootWidth) {
              break;
            }
          }

          var _width = horizontal || _adjustedRootWidth && _computedSize > _adjustedRootWidth ? _adjustedRootWidth : _computedSize;

          var _computedHeight = horizontal || showMore ? _computedSize : _height;

          return {
            width: _width,
            offset: _offset,
            dataCount: _dataCount,
            domainPadding: _domainPadding,
            height: _computedHeight,
            enableShowMore: Boolean(_height) && ( // It can't fit the desired height
            // or
            // It can't fit the dynamic width
            _fullSize > _height || _fullSize > _adjustedRootWidth)
          };
        }

      case 'line':
        {
          var _offset2 = offsetProp || theme.line.offset;

          var _rootWidth2 = rootRef && rootRef.getBoundingClientRect().width;

          if (_rootWidth2) {
            _offset2 = _rootWidth2 / primaryData.length;
          }

          var _height2 = heightProp || theme.line.height;

          var computedWidth = primaryData.length * _offset2;
          return {
            height: _height2,
            offset: _offset2,
            width: computedWidth
          };
        }

      default:
        return {};
    }
  }, [visualType, widthProp, theme.pie.width, theme.pie.height, theme.bar, theme.axis.labelWidth, theme.line.offset, theme.line.height, heightProp, primaryData, offsetProp, paddingProp, horizontal, rootRef, showMore, isComparison]);

  if (!data) {
    return null;
  }

  var renderChart = function renderChart() {
    switch (visualType) {
      case 'square_nested_proportional_area':
      case 'circle_nested_proportional_area':
        {
          var summedData = (0, _aggregateData.default)('sum', data, false)[0].y;
          var summedReferenceData = referenceData.reduce(function (a, b) {
            return a + b.y;
          }, 0);
          summedReferenceData = referenceData.length && summedReferenceData ? summedReferenceData : summedData;
          var dataLabel = label && profiles.profile[label] || data[0].x || data[0].label || label;
          var referenceLabelProp = propReferenceLabel || label;
          var referenceLabel = referenceLabelProp && profiles.parent[referenceLabelProp] || (referenceData.length && summedReferenceData ? referenceData[0].x || referenceData[0].label : dataLabel) || referenceLabelProp;
          return _react.default.createElement("div", {
            style: {
              width: !isComparison ? 200 : 650
            }
          }, _react.default.createElement(_NestedProportionalAreaChart.default, _extends({
            key: key,
            formatNumberForLabel: function formatNumberForLabel(x) {
              return format(x);
            },
            square: visualType === 'square_nested_proportional_area',
            height: isComparison && 500,
            width: !isComparison ? 200 : 650,
            groupSpacing: isComparison && 8,
            data: !isComparison ? [{
              y: summedData,
              x: dataLabel
            }] : [{
              y: summedData,
              x: dataLabel
            }, {
              y: comparisonData.reduce(function (a, b) {
                return a + b.y;
              }, 0),
              x: comparisonData[0].label || profiles.comparison[label] || label
            }],
            reference: [{
              label: referenceLabel,
              y: summedReferenceData,
              x: referenceLabel
            }]
          }, chartProps)));
        }

      case 'pie':
        {
          var height = calculations.height,
              width = calculations.width;
          return _react.default.createElement("div", {
            style: {
              height: height,
              width: width
            }
          }, _react.default.createElement(_PieChart.default, _extends({
            donut: true,
            key: key,
            data: primaryData,
            donutLabelKey: {
              dataIndex: 0
            },
            theme: theme,
            width: width,
            height: height
          }, chartProps)));
        }

      case 'number':
        {
          /**
           * Statistic aggregate
           *  default: 'last',
           */
          var statAggregate = aggregate || 'last';
          /**
           * Statistic data aggregation
           * with respect to label
           *  default: false
           */

          var _statAggregate$split = statAggregate.split(':'),
              _statAggregate$split2 = _slicedToArray(_statAggregate$split, 1),
              func = _statAggregate$split2[0];

          var statUnique = unique !== undefined ? unique : !(0, _aggregateData.isSelectFunc)(func);
          var dataStat = (0, _aggregateData.default)(statAggregate, data, statUnique);
          var dataStatY = format(dataStat[0].y);
          var xDesc = (0, _aggregateData.isSelectFunc)(func) ? "(".concat(dataStat[0].x, ")") : '';
          xDesc = dataStat[0].groupBy ? "".concat(xDesc.substring(0, xDesc.length - 1), " - ").concat(dataStat[0].groupBy, ")") : "".concat(xDesc);
          return _react.default.createElement(_NumberVisuals.default, _extends({
            key: key,
            subtitle: subtitle,
            statistic: dataStatY,
            description: "".concat(description, " ").concat(xDesc),
            comparisonData: [] // TODO: pending NumberVisuals components (HURUmap-UI) fix on this propTypes
            ,
            classes: {} // TODO: pending NumberVisuals style configurations - update root margin

          }, chartProps));
        }

      case 'grouped_column':
        {
          var offset = calculations.offset,
              _height3 = calculations.height,
              _width2 = calculations.width,
              dataCount = calculations.dataCount,
              domainPadding = calculations.domainPadding;
          return _react.default.createElement("div", {
            style: {
              width: _width2,
              height: _height3
            }
          }, _react.default.createElement(_BarChart.default, _extends({
            key: key,
            data: primaryData.map(function (d) {
              return d.slice(0, dataCount);
            }),
            offset: offset,
            width: _width2,
            height: _height3,
            horizontal: showMore || horizontal,
            domainPadding: domainPadding,
            labels: function labels(_ref4) {
              var datum = _ref4.datum;
              return format(datum.y);
            },
            padding: paddingProp,
            theme: theme
          }, chartProps)));
        }

      case 'column':
        {
          var _offset3 = calculations.offset,
              _height4 = calculations.height,
              _width3 = calculations.width,
              _dataCount2 = calculations.dataCount,
              _domainPadding2 = calculations.domainPadding;

          if (isComparison) {
            var processedComparisonData = aggregate ? (0, _aggregateData.default)(aggregate, comparisonData) : comparisonData;
            return _react.default.createElement("div", {
              style: {
                width: _width3,
                height: _height4
              }
            }, _react.default.createElement(_BarChart.default, _extends({
              data: [primaryData.slice(0, _dataCount2), processedComparisonData.slice(0, _dataCount2)],
              key: key,
              offset: _offset3,
              height: _height4,
              width: _width3,
              horizontal: showMore || horizontal,
              domainPadding: _domainPadding2,
              labels: function labels(_ref5) {
                var datum = _ref5.datum;
                return format(datum.y);
              },
              theme: theme
            }, chartProps)));
          }

          return _react.default.createElement("div", {
            style: {
              width: _width3,
              height: _height4
            }
          }, _react.default.createElement(_BarChart.default, _extends({
            key: key,
            data: primaryData.slice(0, _dataCount2),
            offset: _offset3,
            height: _height4,
            width: _width3,
            horizontal: showMore || horizontal,
            domainPadding: _domainPadding2,
            labels: function labels(_ref6) {
              var datum = _ref6.datum;
              return format(datum.y);
            },
            theme: theme
          }, chartProps)));
        }

      case 'bullet':
        {
          var _summedData = (0, _aggregateData.default)('sum', primaryData, false)[0].y;

          var _summedReferenceData = referenceData.reduce(function (a, b) {
            return a + b.y;
          }, 0) || primaryData[0].y;

          return _react.default.createElement(_BulletChart.default, _extends({
            total: unit === 'percent' ? 100 : _summedData,
            data: !isComparison ? primaryData : [primaryData, comparisonData],
            reference: _summedReferenceData,
            height: !isComparison ? 50 : 100,
            width: widthProp || 350,
            labels: function labels(datum) {
              return format(datum.y);
            },
            theme: theme
          }, chartProps));
        }

      case 'line':
        {
          var _height5 = calculations.height,
              _width4 = calculations.width;
          return _react.default.createElement(_LineChart.default, _extends({
            key: key,
            responsive: true,
            height: _height5,
            width: _width4,
            data: !isComparison ? primaryData : [primaryData, comparisonData],
            parts: {
              container: {
                labels: function labels(_ref7) {
                  var datum = _ref7.datum;
                  return "y: ".concat(format(datum.y));
                }
              },
              scatter: {
                size: 5
              }
            },
            theme: theme
          }, chartProps, {
            horizontal: false
          }));
        }

      default:
        return null;
    }
  };

  return _react.default.createElement(_core.Box, {
    id: id,
    ref: setRootRef,
    flexGrow: 1,
    component: "div",
    display: "flex",
    flexDirection: "column",
    alignItems: "center"
  }, primaryData.length || ['circle_nested_proportional_area', 'circle_nested_proportional_area', 'number'].includes(visualType) ? renderChart() : null, !disableShowMore && ['column', 'grouped_column'].includes(visualType) && calculations.enableShowMore && _react.default.createElement(_core.ButtonBase, {
    className: DOWNLOAD_HIDDEN_CLASSNAME,
    onClick: function onClick() {
      return setShowMore(!showMore);
    }
  }, showMore ? 'Show Less' : 'Show More'));
}, function (prevProps, nextProps) {
  return JSON.stringify(prevProps) === JSON.stringify(nextProps);
});

ChartFactory.propTypes = {
  theme: _propTypes.default.theme.isRequired,
  definition: _propTypes.default.shape({
    id: _propTypes.default.string,
    type: _propTypes.default.string,

    /**
     * Custom chart props
     * These props override any default or computed values
     */
    typeProps: _propTypes.default.shape({}),
    label: _propTypes.default.string,
    reference: _propTypes.default.shape({
      label: _propTypes.default.string
    }),
    aggregate: _propTypes.default.string,
    signDisplay: _propTypes.default.string,
    subtitle: _propTypes.default.string,
    description: _propTypes.default.string,

    /**
     * Affects only the number visual
     * Unique = true means aggregate with respect to label
     */
    unique: _propTypes.default.bool,
    horizontal: _propTypes.default.bool,
    locale: _propTypes.default.string,
    customUnit: _propTypes.default.string,

    /**
     * The rest of the props are going to be considered as:
     *  Intl.NumberFormatOptions
     */
    unit: _propTypes.default.string
  }).isRequired,
  data: _propTypes.default.graphQlData.isRequired,
  isComparison: _propTypes.default.bool,
  comparisonData: _propTypes.default.graphQlData,
  referenceData: _propTypes.default.graphQlData,

  /*
   * Profiles are needed in the chart builder
   * since we have no relationships in the database
   * so we have to query profiles separately and this is
   * a work around solution to have those profile data available to us
   * when we want to use the labels for the parent or profile.
   * This can further be used to reference squareKms of a profile
   * but population is not available in the profile.
   */
  profiles: _propTypes.default.shape({
    parent: _propTypes.default.shape({}),
    profile: _propTypes.default.shape({}),
    comparison: _propTypes.default.shape({})
  }),
  disableShowMore: _propTypes.default.bool
};
ChartFactory.defaultProps = {
  isComparison: false,
  comparisonData: [],
  profiles: {
    parent: {},
    profile: {},
    comparison: {}
  },
  referenceData: [],
  disableShowMore: false
};

var _default = (0, _withVictoryTheme.default)(ChartFactory);

exports.default = _default;