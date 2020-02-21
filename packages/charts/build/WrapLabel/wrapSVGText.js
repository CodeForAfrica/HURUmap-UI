"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _default = function _default(textElement, text, width, onMaxDimmension, horizontal) {
  var maxDimmension = 0;
  var words = text.split(/\s+/).reverse();
  var word = words.pop();
  var line = [];
  var lineHeight = 14;
  var x = textElement.getAttribute('x');
  var textAnchor = textElement.getAttribute('text-anchor');
  var dy = 0;
  var dx = 0;
  var tspan = document.createElementNS('http://www.w3.org/2000/svg', 'tspan');
  tspan.setAttribute('text-anchor', textAnchor || 'middle');

  if (x) {
    tspan.setAttribute('x', x);
  }

  if (dy) {
    tspan.setAttribute('dy', dy);
  }

  if (dx) {
    tspan.setAttribute('dx', dx);
  }

  textElement.appendChild(tspan);

  while (word) {
    line.push(word);
    tspan.textContent = line.join(' ');

    if (tspan.getBoundingClientRect().width > width) {
      line.pop();
      tspan.textContent = line.join(' ');
      line = [word];

      if (horizontal) {
        maxDimmension += tspan.getBoundingClientRect().height;
      } else if (tspan.getBoundingClientRect().width > maxDimmension) {
        maxDimmension = tspan.getBoundingClientRect().width;
      } else {// Nothing
      }

      tspan = document.createElementNS('http://www.w3.org/2000/svg', 'tspan');
      tspan.textContent = word;
      tspan.setAttribute('text-anchor', textAnchor || 'middle');
      tspan.setAttribute('dy', lineHeight.toString());

      if (x) {
        tspan.setAttribute('x', x);
      }

      if (dx) {
        tspan.setAttribute('dx', dx);
      }

      textElement.appendChild(tspan);
    } else if (horizontal) {
      maxDimmension += tspan.getBoundingClientRect().height;
    } else if (tspan.getBoundingClientRect().width > maxDimmension) {
      maxDimmension = tspan.getBoundingClientRect().width;
    } else {// Nothing
    }

    word = words.pop();
  }

  onMaxDimmension(maxDimmension);
};

exports.default = _default;