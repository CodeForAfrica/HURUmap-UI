export default (textElement, text, width, onMaxDimmension, horizontal) => {
  let maxDimmension = 0;

  const words = text.split(/\s+/).reverse();
  let word = words.pop();
  let line = [];
  const lineHeight = 14;
  const x = textElement.getAttribute('x');
  const textAnchor = textElement.getAttribute('text-anchor');
  const dy = 0;
  const dx = 0;

  let tspan = document.createElementNS('http://www.w3.org/2000/svg', 'tspan');
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
      } else {
        // Nothing
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
    } else {
      // Nothing
    }

    word = words.pop();
  }

  onMaxDimmension(maxDimmension);
};
