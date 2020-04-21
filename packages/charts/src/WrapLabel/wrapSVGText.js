export function computeMaxLabelDimension({ labelWidth, texts }) {
  let maxLabelWidth = 0;
  let maxLabelHeight = 0;

  const lineHeight = "14";

  const svg = document.createElementNS("http://www.w3.org/2000/svg", "svg");
  const textEl = document.createElementNS("http://www.w3.org/2000/svg", "text");
  svg.setAttribute("opacity", "0");
  document.body.appendChild(svg);
  svg.appendChild(textEl);

  const text = String(
    texts.length > 1
      ? texts.reduce((a, b) => (a.length > b.length ? a : b), "")
      : texts[0] || ""
  );

  let line = [];
  const words = text.split(/\s+/).reverse();
  let word = words.pop();

  let tspan = document.createElementNS("http://www.w3.org/2000/svg", "tspan");
  tspan.setAttribute("text-anchor", "middle");
  textEl.appendChild(tspan);

  while (word) {
    line.push(word);
    tspan.textContent = line.join(" ");
    let { width, height } = tspan.getBoundingClientRect();
    maxLabelHeight += height;
    if (width > labelWidth) {
      line.pop();
      tspan.textContent = line.join(" ");
      line = [word];

      ({ width, height } = tspan.getBoundingClientRect());
      maxLabelHeight += height;
      if (width > maxLabelWidth) {
        maxLabelWidth = width;
      }

      tspan = document.createElementNS("http://www.w3.org/2000/svg", "tspan");
      tspan.setAttribute("text-anchor", "middle");
      tspan.setAttribute("dy", lineHeight);
      tspan.textContent = word;
    } else if (width > maxLabelWidth) {
      maxLabelWidth = width;
    }

    word = words.pop();
  }

  document.body.removeChild(svg);

  return { maxLabelWidth, maxLabelHeight };
}

export default (textElement, text, labelWidth) => {
  if (!textElement) {
    return;
  }

  const words = text.split(/\s+/).reverse();
  const textAnchor = textElement.getAttribute("text-anchor");
  const x = textElement.getAttribute("x");
  const lineHeight = "14";
  const dy = 0;
  const dx = 0;

  let line = [];
  let word = words.pop();
  let tspan = document.createElementNS("http://www.w3.org/2000/svg", "tspan");
  tspan.setAttribute("text-anchor", textAnchor || "middle");

  if (x) {
    tspan.setAttribute("x", x);
  }
  if (dy) {
    tspan.setAttribute("dy", dy);
  }
  if (dx) {
    tspan.setAttribute("dx", dx);
  }
  textElement.appendChild(tspan);

  while (word) {
    line.push(word);
    tspan.textContent = line.join(" ");

    if (tspan.getBoundingClientRect().width > labelWidth) {
      line.pop();
      tspan.textContent = line.join(" ");
      line = [word];

      tspan = document.createElementNS("http://www.w3.org/2000/svg", "tspan");
      tspan.setAttribute("text-anchor", textAnchor || "middle");
      tspan.setAttribute("dy", lineHeight);
      tspan.textContent = word;

      if (x) {
        tspan.setAttribute("x", x);
      }
      if (dx) {
        tspan.setAttribute("dx", dx);
      }
      textElement.appendChild(tspan);
    }
    word = words.pop();
  }
};
