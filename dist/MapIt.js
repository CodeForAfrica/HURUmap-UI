var __assign = (this && this.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
var __rest = (this && this.__rest) || function (s, e) {
    var t = {};
    for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p) && e.indexOf(p) < 0)
        t[p] = s[p];
    if (s != null && typeof Object.getOwnPropertySymbols === "function")
        for (var i = 0, p = Object.getOwnPropertySymbols(s); i < p.length; i++) if (e.indexOf(p[i]) < 0)
            t[p[i]] = s[p[i]];
    return t;
};
var __read = (this && this.__read) || function (o, n) {
    var m = typeof Symbol === "function" && o[Symbol.iterator];
    if (!m) return o;
    var i = m.call(o), r, ar = [], e;
    try {
        while ((n === void 0 || n-- > 0) && !(r = i.next()).done) ar.push(r.value);
    }
    catch (error) { e = { error: error }; }
    finally {
        try {
            if (r && !r.done && (m = i["return"])) m.call(i);
        }
        finally { if (e) throw e.error; }
    }
    return ar;
};
import { withStyles } from '@material-ui/core';
import { createStyles } from '@material-ui/core/styles';
import React, { useEffect, useRef, useCallback } from 'react';
import leaflet from 'leaflet';
import 'leaflet/dist/leaflet.css';
var styles = createStyles({
    root: {
        height: '100%',
        width: '100%'
    }
});
function MapIt(_a) {
    var id = _a.id, classes = _a.classes, _b = _a.url, url = _b === void 0 ? 'https://mapit.hurumap.org' : _b, _c = _a.generation, generation = _c === void 0 ? '1' : _c, drawChildren = _a.drawChildren, drawProfile = _a.drawProfile, geoCode = _a.geoCode, geoLevel = _a.geoLevel, codeType = _a.codeType, _d = _a.filterCountries, filterCountries = _d === void 0 ? ['KE', 'ZA'] : _d, tileLayer = _a.tileLayer, _e = _a.geoLayerFocusStyle, geoLayerFocusStyle = _e === void 0 ? {
        color: '#777',
        fillColor: '#0F0',
        weight: 2,
        opacity: 0.3,
        fillOpacity: 0.5
    } : _e, _f = _a.geoLayerBlurStyle, geoLayerBlurStyle = _f === void 0 ? {
        color: '#00d',
        fillColor: '#ccc',
        weight: 1.0,
        opacity: 0.3,
        fillOpacity: 0.3
    } : _f, _g = _a.geoLayerHoverStyle, geoLayerHoverStyle = _g === void 0 ? {
        fillColor: '#ccc',
        fillOpacity: 0.7
    } : _g, onClickGeoLayer = _a.onClickGeoLayer, leafletProps = __rest(_a, ["id", "classes", "url", "generation", "drawChildren", "drawProfile", "geoCode", "geoLevel", "codeType", "filterCountries", "tileLayer", "geoLayerFocusStyle", "geoLayerBlurStyle", "geoLayerHoverStyle", "onClickGeoLayer"]);
    var mapId = id || 'mapit';
    var mapRef = useRef(null);
    // The `extra` parameter is an object with properties that are not returned in a geojson call
    // The geojson only returns the name in the properties which is not sufficient
    // in retrieving the are information on click.
    //
    // We append the area information after the geojson is received to avoid another load
    // But also to have sufficient data to use like the `id` if we want to retrieve
    // more data using an api call
    var fetchGeoJson = useCallback(function (areaKeys, areas) {
        return fetch(url + "/areas/" + areaKeys + ".geojson").then(function (geoRes) {
            if (!geoRes.ok)
                return Promise.reject();
            return geoRes.json().then(function (_a) {
                var features = _a.features;
                return features
                    ? features.map(function (feature) {
                        var areaInfo = areas.find(function (area) { return area.name === feature.properties.name; });
                        return __assign({}, feature, { properties: __assign({}, feature.properties, areaInfo) });
                    })
                    : [];
            });
        });
    }, [url]);
    function fetchMapitArea() {
        return __awaiter(this, void 0, void 0, function () {
            var areaRes;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, fetch(url + "/code/" + codeType + "/" + geoLevel + "-" + geoCode + "?generation=" + generation)];
                    case 1:
                        areaRes = _a.sent();
                        return [2 /*return*/, areaRes.json()];
                }
            });
        });
    }
    var loadGeometryForLevel = useCallback(function () {
        // geo_level do not always match to mapit area type
        // AFR geo_level are level1_TZ_001 while mapit area type are specific ie PROVINCE, REGION, COUNTY
        // Using the geoid (geoLevel-geoCode) we will first request mapit api to give us=> mapit type of a specific geo
        return fetchMapitArea().then(function (area) {
            var country = area.country, type = area.type;
            return fetch(url + "/areas/" + type + "?generation=" + generation + "&country=" + country).then(function (areaRes) {
                if (!areaRes.ok)
                    return Promise.reject();
                return areaRes.json().then(function (data) {
                    var areaKeys = Object.keys(data).join();
                    return fetchGeoJson(areaKeys, Object.values(data));
                });
            });
        });
    }, [fetchMapitArea, fetchGeoJson, generation, url]);
    var loadGeometryForChildLevel = useCallback(function (areaId) {
        return fetch(url + "/area/" + areaId + "/children").then(function (areasRes) {
            if (!areasRes.ok)
                return Promise.reject();
            return areasRes.json().then(function (data) {
                var areaData = data;
                if (filterCountries.length > 0 &&
                    !drawProfile &&
                    geoLevel === 'continent') {
                    areaData = Object.entries(data)
                        .filter(function (area) {
                        return filterCountries.includes(area[1].country);
                    })
                        .reduce(function (accum, _a) {
                        var _b;
                        var _c = __read(_a, 2), k = _c[0], v = _c[1];
                        return Object.assign({}, accum, (_b = {}, _b[k] = v, _b));
                    }, {});
                }
                var areaKeys = Object.keys(areaData).join();
                return fetchGeoJson(areaKeys, Object.values(areaData));
            });
        });
    }, [url, filterCountries, drawProfile, geoLevel, fetchGeoJson]);
    var drawFeatures = useCallback(function (map, features) {
        return leaflet
            .geoJSON(features, {
            onEachFeature: function (feature, layer) {
                if (drawProfile &&
                    geoLevel + "-" + geoCode ===
                        feature.properties.codes[codeType || 'AFR']) {
                    layer.setStyle(geoLayerFocusStyle);
                    map.fitBounds(layer.getBounds());
                }
                else {
                    layer.bindTooltip(feature.properties.name, { direction: 'auto' });
                    layer.on('mouseover', function () {
                        layer.setStyle(geoLayerHoverStyle);
                    });
                    layer.on('mouseout', function () {
                        layer.setStyle(geoLayerBlurStyle);
                    });
                    layer.on('click', function () {
                        if (onClickGeoLayer) {
                            onClickGeoLayer(feature.properties);
                        }
                    });
                    layer.setStyle(geoLayerBlurStyle);
                }
            }
        })
            .addTo(map);
    }, [
        drawProfile,
        geoLevel,
        geoCode,
        codeType,
        geoLayerFocusStyle,
        geoLayerBlurStyle,
        geoLayerHoverStyle,
        onClickGeoLayer
    ]);
    var load = useCallback(function () {
        var map = mapRef.current;
        if (!map) {
            console.error('Map not loaded!');
            return;
        }
        // if we are not on a profile page, then we are on homepage or country page
        // where no specific geography is focused, only child levels of the root geography are drawn
        // For normal hurumap apps, the root geo is country, so we draw all it's child level
        // And for apps like dominion/takwimu, we start at a continent level and we draw its all child level (country)
        // but not all child levels are supposed to be drawn (i.e mapit has ethiopia as child of continent but we don't have dominion ethiopia)
        // so in this case we will filter using loadCountrries
        if (drawProfile) {
            loadGeometryForLevel()
                .then(function (features) {
                drawFeatures(map, features);
            })
                .then(function () {
                if (drawChildren) {
                    fetchMapitArea().then(function (area) {
                        loadGeometryForChildLevel(area.id).then(function (childrenFeatures) {
                            drawFeatures(map, childrenFeatures);
                        });
                    });
                }
            });
        }
        else {
            fetchMapitArea().then(function (area) {
                return loadGeometryForChildLevel(area.id).then(function (childrenFeatures) {
                    var layer = drawFeatures(map, childrenFeatures);
                    map.fitBounds(layer.getBounds());
                });
            });
        }
    }, [
        drawProfile,
        loadGeometryForLevel,
        drawChildren,
        fetchMapitArea,
        loadGeometryForChildLevel,
        drawFeatures
    ]);
    useEffect(function () {
        if (mapRef.current) {
            mapRef.current.remove();
        }
        mapRef.current = leaflet.map(mapId, __assign({ boxZoom: false, doubleClickZoom: false, dragging: true, keyboard: false, scrollWheelZoom: false, touchZoom: false, zoomControl: false, center: [0, 0], zoom: 3 }, leafletProps));
        var map = mapRef.current;
        if (map.dragging) {
            map.addControl(new leaflet.Control.Zoom({
                position: 'bottomright'
            }));
        }
        if (tileLayer) {
            tileLayer.addTo(map);
        }
        else {
            leaflet
                .tileLayer('https://server.arcgisonline.com/ArcGIS/rest/services/Canvas/World_Light_Gray_Base/MapServer/tile/{z}/{y}/{x}', {
                attribution: 'Tiles &copy; Esri &mdash; Esri, DeLorme, NAVTEQ'
            })
                .addTo(map);
        }
        load();
    }, [mapId, leafletProps, tileLayer, load]);
    return React.createElement("div", { id: mapId, className: classes.root });
}
export default withStyles(styles)(MapIt);
