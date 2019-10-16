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
 * for a long string. We need this component to help breakdown long strings
 * but yet, reuse everything VictoryLabel offers: styling, etc.
 *
 * @param {*} param0 .
 */
function Label({ text: originalText, width, style, ...props }) {
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
  style: PropTypes.shape({}),
  text: PropTypes.string,
  width: PropTypes.number
};

Label.defaultProps = {
  style: undefined,
  text: undefined,
  width: undefined
};

export default Label;
