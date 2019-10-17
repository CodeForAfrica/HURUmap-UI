import React, { useEffect, useState, useMemo } from 'react';
import PropTypes from 'prop-types';

import { VictoryLabel } from 'victory';

const getFont = (style = {}) => {
  const { font, fontFamily, fontSize } = style;
  if (font) {
    return font;
  }
  // font requires at least family and size: https://developer.mozilla.org/en-US/docs/Web/CSS/font#Syntax
  if (fontFamily && fontSize) {
    const unit = typeof fontSize === 'number' ? 'px' : '';
    return `${fontSize}${unit} ${fontFamily}`;
  }
  return undefined;
};

/**
 * While VictoryLabel can handle array of strings, it can not handle wrapping
 * of a long string or color text based on `colorScale`.
 *
 * @param {*} param0 .
 */
function Label({
  colorScale,
  datum,
  style: originalStyle,
  text: originalText,
  width,
  ...props
}) {
  const style = Array.isArray(colorScale)
    ? {
        // eslint-disable-next-line no-underscore-dangle
        fill: colorScale[(datum._x - 1) % colorScale.length],
        ...originalStyle
      }
    : originalStyle;
  const [text, setText] = useState(originalText);
  const canvas = useMemo(() => document.createElement('canvas'), []);
  useEffect(() => {
    const wrap = textToWrap => {
      const words = textToWrap.split(/\s+/).reverse();
      const textLines = [];
      let word = words.pop();
      let line = [];
      const font = getFont(style);
      if (font) {
        canvas.getContext('2d').font = font;
      }

      while (word) {
        line.push(word);
        const textContent = line.join(' ');
        const { width: measuredWidth } = canvas
          .getContext('2d')
          .measureText(textContent);
        if (measuredWidth > width) {
          line.pop();
          if (line.length > 0) {
            textLines.push(line.join(' '));
            line = [word];
          } else {
            // single, long word
            textLines.push(word);
          }
        }
        word = words.pop();
      }
      // Any word(s) whose length was still < width
      if (line.length > 0) {
        textLines.push(line.join(' '));
      }
      return textLines.join('\n');
    };
    if (originalText && width) {
      // Preserve any `\n` in original text string (if any)
      const textToWrap = Array.isArray(originalText)
        ? originalText
        : originalText.split('\n');
      setText(textToWrap.map(wrap).join('\n'));
    }
  }, [canvas, originalText, style, width]);

  return <VictoryLabel style={style} text={text} {...props} />;
}

Label.propTypes = {
  colorScale: PropTypes.arrayOf(PropTypes.shape({})),
  // TSeems like datum has _x variable that tracks the data index (but it
  // starts from 1).
  datum: PropTypes.shape({ _x: PropTypes.number }),
  style: PropTypes.shape({}),
  text: PropTypes.string,
  width: PropTypes.number
};

Label.defaultProps = {
  colorScale: undefined,
  datum: undefined,
  style: undefined,
  text: undefined,
  width: undefined
};

export default Label;
