export default (function (textElement, text, width) {
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
    }

    word = words.pop();
  }
});