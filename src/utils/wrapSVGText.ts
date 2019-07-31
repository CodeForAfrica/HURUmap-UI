export default (textElement: SVGTextElement, text: string, width: number) => {
  const words = text.split(/\s+/).reverse();
  let word = words.pop();
  let line: any = [];
  let lineNumber = 1;
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

      tspan = document.createElementNS('http://www.w3.org/2000/svg', 'tspan');
      tspan.textContent = word;
      tspan.setAttribute('text-anchor', textAnchor || 'middle');
      tspan.setAttribute(
        'dy',
        (lineNumber * lineHeight + parseFloat(dy || '0')).toString()
      );

      if (x) {
        tspan.setAttribute('x', x);
      }
      if (dx) {
        tspan.setAttribute('dx', dx);
      }
      textElement.appendChild(tspan);

      lineNumber += 1;
    }
    word = words.pop();
  }
};
