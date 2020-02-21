"use strict";

function _typeof(obj) { "@babel/helpers - typeof"; if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _react = _interopRequireWildcard(require("react"));

var _propTypes = _interopRequireDefault(require("prop-types"));

var _leaflet = _interopRequireDefault(require("leaflet"));

require("leaflet/dist/leaflet.css");

var _useDeepRef = _interopRequireDefault(require("./useDeepRef"));

var _makeStyles = _interopRequireDefault(require("../makeStyles"));

var _BlockLoader = _interopRequireDefault(require("../BlockLoader"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _getRequireWildcardCache() { if (typeof WeakMap !== "function") return null; var cache = new WeakMap(); _getRequireWildcardCache = function _getRequireWildcardCache() { return cache; }; return cache; }

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } if (obj === null || _typeof(obj) !== "object" && typeof obj !== "function") { return { default: obj }; } var cache = _getRequireWildcardCache(); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj.default = obj; if (cache) { cache.set(obj, newObj); } return newObj; }

function _toConsumableArray(arr) { return _arrayWithoutHoles(arr) || _iterableToArray(arr) || _nonIterableSpread(); }

function _nonIterableSpread() { throw new TypeError("Invalid attempt to spread non-iterable instance"); }

function _iterableToArray(iter) { if (Symbol.iterator in Object(iter) || Object.prototype.toString.call(iter) === "[object Arguments]") return Array.from(iter); }

function _arrayWithoutHoles(arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = new Array(arr.length); i < arr.length; i++) { arr2[i] = arr[i]; } return arr2; } }

function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { Promise.resolve(value).then(_next, _throw); } }

function _asyncToGenerator(fn) { return function () { var self = this, args = arguments; return new Promise(function (resolve, reject) { var gen = fn.apply(self, args); function _next(value) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value); } function _throw(err) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err); } _next(undefined); }); }; }

function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(Object(source), true).forEach(function (key) { _defineProperty(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

function _slicedToArray(arr, i) { return _arrayWithHoles(arr) || _iterableToArrayLimit(arr, i) || _nonIterableRest(); }

function _nonIterableRest() { throw new TypeError("Invalid attempt to destructure non-iterable instance"); }

function _iterableToArrayLimit(arr, i) { if (!(Symbol.iterator in Object(arr) || Object.prototype.toString.call(arr) === "[object Arguments]")) { return; } var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"] != null) _i["return"](); } finally { if (_d) throw _e; } } return _arr; }

function _arrayWithHoles(arr) { if (Array.isArray(arr)) return arr; }

function _objectWithoutProperties(source, excluded) { if (source == null) return {}; var target = _objectWithoutPropertiesLoose(source, excluded); var key, i; if (Object.getOwnPropertySymbols) { var sourceSymbolKeys = Object.getOwnPropertySymbols(source); for (i = 0; i < sourceSymbolKeys.length; i++) { key = sourceSymbolKeys[i]; if (excluded.indexOf(key) >= 0) continue; if (!Object.prototype.propertyIsEnumerable.call(source, key)) continue; target[key] = source[key]; } } return target; }

function _objectWithoutPropertiesLoose(source, excluded) { if (source == null) return {}; var target = {}; var sourceKeys = Object.keys(source); var key, i; for (i = 0; i < sourceKeys.length; i++) { key = sourceKeys[i]; if (excluded.indexOf(key) >= 0) continue; target[key] = source[key]; } return target; }

var useStyles = (0, _makeStyles.default)({
  root: {
    width: '100%',
    height: '100vh',
    maxHeight: '100%'
  }
});

function MapIt(_ref) {
  var id = _ref.id,
      _ref$url = _ref.url,
      url = _ref$url === void 0 ? 'https://mapit.hurumap.org' : _ref$url,
      _ref$tolerance = _ref.tolerance,
      tolerance = _ref$tolerance === void 0 ? 0.001 : _ref$tolerance,
      _ref$zoom = _ref.zoom,
      zoom = _ref$zoom === void 0 ? 3 : _ref$zoom,
      _ref$generation = _ref.generation,
      generation = _ref$generation === void 0 ? '1' : _ref$generation,
      drawChildren = _ref.drawChildren,
      drawProfile = _ref.drawProfile,
      geoCode = _ref.geoCode,
      geoLevel = _ref.geoLevel,
      codeType = _ref.codeType,
      _ref$filterCountries = _ref.filterCountries,
      filterCountries = _ref$filterCountries === void 0 ? ['KE', 'ZA'] : _ref$filterCountries,
      tileLayer = _ref.tileLayer,
      _ref$geoLayerFocusSty = _ref.geoLayerFocusStyle,
      geoLayerFocusStyle = _ref$geoLayerFocusSty === void 0 ? {
    color: '#777',
    fillColor: '#0F0',
    weight: 2,
    opacity: 0.3,
    fillOpacity: 0.5
  } : _ref$geoLayerFocusSty,
      _ref$geoLayerBlurStyl = _ref.geoLayerBlurStyle,
      geoLayerBlurStyle = _ref$geoLayerBlurStyl === void 0 ? {
    color: '#00d',
    fillColor: '#ccc',
    weight: 1.0,
    opacity: 0.3,
    fillOpacity: 0.3
  } : _ref$geoLayerBlurStyl,
      _ref$geoLayerHoverSty = _ref.geoLayerHoverStyle,
      geoLayerHoverStyle = _ref$geoLayerHoverSty === void 0 ? {
    fillColor: '#ccc',
    fillOpacity: 0.7
  } : _ref$geoLayerHoverSty,
      onClickGeoLayer = _ref.onClickGeoLayer,
      leafletProps = _objectWithoutProperties(_ref, ["id", "url", "tolerance", "zoom", "generation", "drawChildren", "drawProfile", "geoCode", "geoLevel", "codeType", "filterCountries", "tileLayer", "geoLayerFocusStyle", "geoLayerBlurStyle", "geoLayerHoverStyle", "onClickGeoLayer"]);

  var mapId = id || 'mapit';
  var mapRef = (0, _react.useRef)(null);

  var _useState = (0, _react.useState)(),
      _useState2 = _slicedToArray(_useState, 2),
      featuresToDraw = _useState2[0],
      setFeaturesToDraw = _useState2[1];

  var filterCountriesMemoized = (0, _useDeepRef.default)(filterCountries);
  var leafletPropsMemoized = (0, _useDeepRef.default)(leafletProps);
  var geoLayerStyles = (0, _useDeepRef.default)({
    focus: geoLayerFocusStyle,
    blur: geoLayerBlurStyle,
    hover: geoLayerHoverStyle
  }); // The `extra` parameter is an object with properties that are not returned in a geojson call
  // The geojson only returns the name in the properties which is not sufficient
  // in retrieving the are information on click.
  //
  // We append the area information after the geojson is received to avoid another load
  // But also to have sufficient data to use like the `id` if we want to retrieve
  // more data using an api call

  var fetchGeoJson = (0, _react.useCallback)(function (areaKeys, areas) {
    return fetch("".concat(url, "/areas/").concat(areaKeys, ".geojson?simplify_tolerance=").concat(tolerance)).then(function (geoRes) {
      if (!geoRes.ok) return Promise.reject();
      return geoRes.json().then(function (_ref2) {
        var features = _ref2.features;
        return {
          type: 'FeatureCollection',
          features: features ? features.map(function (feature) {
            var areaInfo = areas.find(function (area) {
              return area.name === feature.properties.name;
            });
            return _objectSpread({}, feature, {
              properties: _objectSpread({}, feature.properties, {}, areaInfo)
            });
          }) : []
        };
      });
    });
  }, [url, tolerance]);
  var fetchMapitArea = (0, _react.useCallback)(
  /*#__PURE__*/
  _asyncToGenerator(
  /*#__PURE__*/
  regeneratorRuntime.mark(function _callee() {
    var areaRes;
    return regeneratorRuntime.wrap(function _callee$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            _context.next = 2;
            return fetch("".concat(url, "/code/").concat(codeType, "/").concat(geoLevel, "-").concat(geoCode, "?generation=").concat(generation));

          case 2:
            areaRes = _context.sent;
            return _context.abrupt("return", areaRes.json());

          case 4:
          case "end":
            return _context.stop();
        }
      }
    }, _callee);
  })), [url, codeType, geoLevel, geoCode, generation]);
  var loadGeometryForLevel = (0, _react.useCallback)(function () {
    // geo_level do not always match to mapit area type
    // AFR geo_level are level1_TZ_001 while mapit area type are specific ie PROVINCE, REGION, COUNTY
    // Using the geoid (geoLevel-geoCode) we will first request mapit api to give us=> mapit type of a specific geo
    return fetchMapitArea().then(function (area) {
      var country = area.country,
          type = area.type;
      return fetch("".concat(url, "/areas/").concat(type, "?generation=").concat(generation, "&country=").concat(country)).then(function (areaRes) {
        if (!areaRes.ok) return Promise.reject();
        return areaRes.json().then(function (data) {
          var areaKeys = Object.keys(data).join();
          return fetchGeoJson(areaKeys, Object.values(data));
        });
      });
    });
  }, [fetchMapitArea, fetchGeoJson, generation, url]);
  var loadGeometryForChildLevel = (0, _react.useCallback)(function (areaId) {
    return fetch("".concat(url, "/area/").concat(areaId, "/children")).then(function (areasRes) {
      if (!areasRes.ok) return Promise.reject();
      return areasRes.json().then(function (data) {
        var areaData = data;

        if (filterCountriesMemoized.length > 0 && !drawProfile && geoLevel === 'continent') {
          areaData = Object.entries(data).filter(function (area) {
            return filterCountriesMemoized.includes(area[1].country);
          }).reduce(function (accum, _ref4) {
            var _ref5 = _slicedToArray(_ref4, 2),
                k = _ref5[0],
                v = _ref5[1];

            return _objectSpread({}, accum, _defineProperty({}, k, v));
          }, {});
        }

        var areaKeys = Object.keys(areaData).join();
        return fetchGeoJson(areaKeys, Object.values(areaData));
      });
    });
  }, [url, filterCountriesMemoized, drawProfile, geoLevel, fetchGeoJson]);
  /**
   * Data loading hook
   */

  (0, _react.useEffect)(function () {
    // if we are not on a profile page, then we are on homepage or country page
    // where no specific geography is focused, only child levels of the root geography are drawn
    // For normal hurumap apps, the root geo is country, so we draw all it's child level
    // And for apps like dominion/takwimu, we start at a continent level and we draw its all child level (country)
    // but not all child levels are supposed to be drawn (i.e mapit has ethiopia as child of continent but we don't have dominion ethiopia)
    // so in this case we will filter using loadCountrries
    if (drawProfile) {
      loadGeometryForLevel().then(function (featureCollection) {
        if (drawChildren) {
          fetchMapitArea().then(function (area) {
            loadGeometryForChildLevel(area.id).then(function (childrenFeatureCollection) {
              setFeaturesToDraw({
                type: 'FeatureCollection',
                features: [].concat(_toConsumableArray(featureCollection.features), _toConsumableArray(childrenFeatureCollection.features))
              });
            });
          });
        } else {
          setFeaturesToDraw(featureCollection);
        }
      });
    } else {
      fetchMapitArea().then(function (area) {
        return loadGeometryForChildLevel(area.id).then(function (childrenFeatureCollection) {
          setFeaturesToDraw(childrenFeatureCollection);
        });
      });
    }
  }, [drawChildren, drawProfile, loadGeometryForLevel, fetchMapitArea, loadGeometryForChildLevel]);
  /**
   * Rendering hook
   */

  (0, _react.useEffect)(function () {
    if (!mapRef.current) {
      mapRef.current = _leaflet.default.map(mapId, _objectSpread({
        boxZoom: false,
        doubleClickZoom: false,
        dragging: true,
        keyboard: false,
        scrollWheelZoom: false,
        touchZoom: false,
        zoomControl: false,
        center: [0, 0],
        zoom: zoom
      }, leafletPropsMemoized));

      if (mapRef.current.dragging) {
        mapRef.current.addControl(new _leaflet.default.Control.Zoom({
          position: 'bottomright'
        }));
      }
    }

    var map = mapRef.current; // Clear layers

    map.eachLayer(function (layer) {
      map.removeLayer(layer);
    });

    if (tileLayer) {
      tileLayer.addTo(map);
    } else {
      _leaflet.default.tileLayer('https://server.arcgisonline.com/ArcGIS/rest/services/Canvas/World_Light_Gray_Base/MapServer/tile/{z}/{y}/{x}', {
        attribution: 'Tiles &copy; Esri &mdash; Esri, DeLorme, NAVTEQ'
      }).addTo(map);
    }

    var geoJsonLayer = _leaflet.default.geoJSON(featuresToDraw, {
      onEachFeature: function onEachFeature(feature, layer) {
        if (drawProfile && "".concat(geoLevel, "-").concat(geoCode) === feature.properties.codes[codeType || 'AFR']) {
          layer.setStyle(geoLayerStyles.focus);
          map.fitBounds(layer.getBounds());
        } else {
          layer.bindTooltip(feature.properties.name, {
            direction: 'auto'
          });
          layer.on('mouseover', function () {
            layer.setStyle(geoLayerStyles.hover);
          });
          layer.on('mouseout', function () {
            layer.setStyle(geoLayerStyles.blur);
          });
          layer.on('click', function () {
            if (onClickGeoLayer) {
              onClickGeoLayer(feature.properties);
            }
          });
          layer.setStyle(geoLayerStyles.blur);
        }
      }
    }).addTo(map);

    if (!drawProfile && geoJsonLayer.getBounds().isValid()) {
      map.fitBounds(geoJsonLayer.getBounds());
    }
  }, [mapId, zoom, tileLayer, featuresToDraw, drawProfile, geoLevel, geoCode, codeType, geoLayerStyles, onClickGeoLayer, leafletPropsMemoized]);
  var classes = useStyles();
  return _react.default.createElement(_react.default.Fragment, null, !featuresToDraw && _react.default.createElement("div", {
    className: classes.root
  }, _react.default.createElement(_BlockLoader.default, {
    loading: true
  })), _react.default.createElement("div", {
    id: mapId,
    className: classes.root,
    style: {
      display: !featuresToDraw ? 'hidden' : 'block'
    }
  }));
}

MapIt.propTypes = {
  id: _propTypes.default.string,
  url: _propTypes.default.string,
  tolerance: _propTypes.default.number,
  zoom: _propTypes.default.number,
  drawChildren: _propTypes.default.bool,
  drawProfile: _propTypes.default.bool,
  geoLevel: _propTypes.default.string,
  geoCode: _propTypes.default.string,
  codeType: _propTypes.default.string,
  filterCountries: _propTypes.default.arrayOf(_propTypes.default.string),
  generation: _propTypes.default.string,
  tileLayer: _propTypes.default.shape({
    addTo: _propTypes.default.func
  }),
  geoLayerFocusStyle: _propTypes.default.shape({}),
  geoLayerBlurStyle: _propTypes.default.shape({}),
  geoLayerHoverStyle: _propTypes.default.shape({}),
  onClickGeoLayer: _propTypes.default.func
};
MapIt.defaultProps = {
  id: undefined,
  url: undefined,
  tolerance: undefined,
  zoom: undefined,
  drawChildren: undefined,
  drawProfile: undefined,
  geoLevel: undefined,
  geoCode: undefined,
  codeType: undefined,
  filterCountries: undefined,
  generation: undefined,
  tileLayer: undefined,
  geoLayerFocusStyle: undefined,
  geoLayerBlurStyle: undefined,
  geoLayerHoverStyle: undefined,
  onClickGeoLayer: undefined
};
var _default = MapIt;
exports.default = _default;