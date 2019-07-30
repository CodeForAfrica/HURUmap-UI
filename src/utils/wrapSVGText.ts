export default (width: number) => {
  const tspans = [...document.getElementsByTagName('tspan')];
  for (let i = 0; i < tspans.length; i += 1) {
    const t = tspans[i];
    const text = t.parentElement;
    if (text && text.textContent) {
      const words = text.textContent.split(/\s+/).reverse();
      let word = words.pop();
      let line: any = [];
      let lineNumber = 1;
      const lineHeight = 14;
      const style = t.getAttribute('style');
      const x = text.getAttribute('x');
      const dy = t.getAttribute('dy');
      const dx = t.getAttribute('dx');

      text.textContent = null;

      let tspan = document.createElementNS(
        'http://www.w3.org/2000/svg',
        'tspan'
      );
      tspan.setAttribute('text-anchor', 'middle');

      if (style) {
        tspan.setAttribute('style', style);
      }
      if (x) {
        tspan.setAttribute('x', x);
      }
      if (dy) {
        tspan.setAttribute('dy', dy);
      }
      if (dx) {
        tspan.setAttribute('dx', dx);
      }
      text.appendChild(tspan);
      while (word) {
        line.push(word);
        tspan.textContent = line.join(' ');
        if (tspan.getBoundingClientRect().width > width) {
          line.pop();
          tspan.textContent = line.join(' ');
          line = [word];

          tspan = document.createElementNS(
            'http://www.w3.org/2000/svg',
            'tspan'
          );
          tspan.textContent = word;
          tspan.setAttribute('text-anchor', 'middle');
          tspan.setAttribute(
            'dy',
            (lineNumber * lineHeight + parseFloat(dy || '0')).toString()
          );

          if (style) {
            tspan.setAttribute('style', style);
          }
          if (x) {
            tspan.setAttribute('x', x);
          }
          if (dx) {
            tspan.setAttribute('dx', dx);
          }
          text.appendChild(tspan);

          lineNumber += 1;
        }
        word = words.pop();
      }
    }
  }
};
