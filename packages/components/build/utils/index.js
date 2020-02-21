"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.domToPng = domToPng;
exports.isDowloadHiddenElement = exports.DOWNLOAD_HIDDEN_CLASSNAME = exports.shareIndicator = exports.uploadImage = void 0;

function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(Object(source), true).forEach(function (key) { _defineProperty(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

function _objectWithoutProperties(source, excluded) { if (source == null) return {}; var target = _objectWithoutPropertiesLoose(source, excluded); var key, i; if (Object.getOwnPropertySymbols) { var sourceSymbolKeys = Object.getOwnPropertySymbols(source); for (i = 0; i < sourceSymbolKeys.length; i++) { key = sourceSymbolKeys[i]; if (excluded.indexOf(key) >= 0) continue; if (!Object.prototype.propertyIsEnumerable.call(source, key)) continue; target[key] = source[key]; } } return target; }

function _objectWithoutPropertiesLoose(source, excluded) { if (source == null) return {}; var target = {}; var sourceKeys = Object.keys(source); var key, i; for (i = 0; i < sourceKeys.length; i++) { key = sourceKeys[i]; if (excluded.indexOf(key) >= 0) continue; target[key] = source[key]; } return target; }

var DEFAULT_SHARE_ENDPOINT = '/api/share';

var uploadImage = function uploadImage(id, dataUrl, endPoint) {
  return fetch("".concat(endPoint || DEFAULT_SHARE_ENDPOINT), {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({
      id: id,
      dataUrl: dataUrl
    })
  }).then(function (res) {
    if (res.status === 200) {
      return true;
    }

    return false;
  });
};

exports.uploadImage = uploadImage;

var shareIndicator = function shareIndicator(id, geoId, endPoint, e, dataUrl) {
  var indicatorId = geoId ? "".concat(geoId, "_").concat(id) : id;
  uploadImage(indicatorId, dataUrl, endPoint).then(function (success) {
    if (success) {
      var url = new URL(window.location);
      url.searchParams.set('indicatorId', indicatorId);
      window.open("https://twitter.com/intent/tweet?url=".concat(escape(url.href)));
    }
  });
};

exports.shareIndicator = shareIndicator;
var DOWNLOAD_HIDDEN_CLASSNAME = 'Download--hidden';
exports.DOWNLOAD_HIDDEN_CLASSNAME = DOWNLOAD_HIDDEN_CLASSNAME;

var isDowloadHiddenElement = function isDowloadHiddenElement(node) {
  var classList = node.classList;

  if (classList) {
    return !classList.contains(DOWNLOAD_HIDDEN_CLASSNAME);
  }

  return true;
};

exports.isDowloadHiddenElement = isDowloadHiddenElement;

function domToPng(node, _ref) {
  var nodeStyle = _ref.style,
      options = _objectWithoutProperties(_ref, ["style"]);

  if (node) {
    // To avoid any flicking, it's best to clone the node and run the `filter`
    // function, which may modify the node, on the cloned node.
    var clonedNode = node.cloneNode(true);
    var _clonedNode$style = clonedNode.style,
        left = _clonedNode$style.left,
        position = _clonedNode$style.position;
    clonedNode.style.left = '-999px';
    clonedNode.style.position = 'absolute';
    clonedNode.style.width = "".concat(node.scrollWidth, "px");

    var style = _objectSpread({}, nodeStyle, {
      left: left,
      position: position
    });

    var toPng = function toPng() {
      document.body.appendChild(clonedNode);
      return domToImage.toPng(clonedNode, _objectSpread({}, options, {
        style: style
      })).then(function (dataUrl) {
        document.body.removeChild(clonedNode);
        return dataUrl;
      });
    }; // Use the original node since the clonedNode's iframe wouldn't have
    // time to load yet (we just cloned it)


    var iframes = node.getElementsByTagName('iframe');

    if (iframes && iframes.length) {
      var iframe = iframes[0];

      if (iframe.contentWindow && iframe.contentWindow.domtoimage) {
        return iframe.contentWindow.domtoimage.toPng(iframe.contentDocument.body, _objectSpread({}, options)).then(function (dataUrl) {
          var img = new Image();
          img.src = dataUrl; // replace the clonedNode's iframe with image

          var clonedNodeIframe = clonedNode.getElementsByTagName('iframe')[0];
          clonedNodeIframe.parentNode.replaceChild(img, clonedNodeIframe);
        }).then(function () {
          return toPng();
        });
      }
    }

    return toPng();
  }

  return Promise.resolve(undefined);
}