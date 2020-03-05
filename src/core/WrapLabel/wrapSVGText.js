export function computeMaxLabelDimmension({ initialWidth, horizontal, texts }) {
  let maxDimmension = 0;

  const lineHeight = '14';

  const svg = document.createElementNS('http://www.w3.org/2000/svg', 'svg');
  const textEl = document.createElementNS('http://www.w3.org/2000/svg', 'text');
  svg.setAttribute('opacity', '0');
  document.body.appendChild(svg);
  svg.appendChild(textEl);

  const text =
    texts.length > 1
      ? texts.reduce((a, b) => (a.length > b.length ? a : b), '')
      : texts[0] || '';

  let line = [];
  const words = text.split(/\s+/).reverse();
  let word = words.pop();

  let tspan = document.createElementNS('http://www.w3.org/2000/svg', 'tspan');
  tspan.setAttribute('text-anchor', 'middle');
  textEl.appendChild(tspan);

  while (word) {
    line.push(word);
    tspan.textContent = line.join(' ');
    let { width, height } = tspan.getBoundingClientRect();
    if (width > initialWidth) {
      line.pop();
      tspan.textContent = line.join(' ');
      line = [word];

      ({ width, height } = tspan.getBoundingClientRect());
      if (horizontal) {
        maxDimmension += height;
      } else if (width > maxDimmension) {
        maxDimmension = width;
      } else {
        // Nothing
      }

      tspan = document.createElementNS('http://www.w3.org/2000/svg', 'tspan');
      tspan.setAttribute('text-anchor', 'middle');
      tspan.setAttribute('dy', lineHeight);
      tspan.textContent = word;
    } else if (horizontal) {
      maxDimmension += height;
    } else if (width > maxDimmension) {
      maxDimmension = width;
    } else {
      // Nothing
    }

    word = words.pop();
  }

  document.body.removeChild(svg);

  return maxDimmension;
}

export default (textElement, text, initialWidth) => {
  if (!textElement) {
    return;
  }

  const words = text.split(/\s+/).reverse();
  const textAnchor = textElement.getAttribute('text-anchor');
  const x = textElement.getAttribute('x');
  const lineHeight = '14';
  const dy = 0;
  const dx = 0;

  let line = [];
  let word = words.pop();
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

    if (tspan.getBoundingClientRect().width > initialWidth) {
      line.pop();
      tspan.textContent = line.join(' ');
      line = [word];

      tspan = document.createElementNS('http://www.w3.org/2000/svg', 'tspan');
      tspan.setAttribute('text-anchor', textAnchor || 'middle');
      tspan.setAttribute('dy', lineHeight);
      tspan.textContent = word;

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
};
