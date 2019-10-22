import React, { useEffect, useState, useMemo } from 'react';
import PropTypes from 'prop-types';

import { VictoryLabel } from 'victory';

import propTypes from './propTypes';

const getFont = (style = {}) => {
  const { font, fontFamily, fontSize } = Array.isArray(style)
    ? style[0]
    : style;
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

/* eslint-disable-next-line no-unused-vars */
const wrapText = (text, width, canvas, style) => {
  const words = text.split(/\s+/).reverse();
  const textLines = [];
  let word = words.pop();
  let line = [];
  const font = getFont(style);
  const context = canvas.getContext('2d');
  if (font) {
    context.font = font;
  }

  while (word) {
    line.push(word);
    const textContent = line.join(' ');
    const { width: measuredWidth } = context.measureText(textContent);
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
  return textLines;
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
  highlightIndex,
  highlightStyle,
  style: originalStyle,
  text: originalText,
  width,
  ...props
}) {
  // const style = Array.isArray(colorScale)
  //   ? {
  //       // eslint-disable-next-line no-underscore-dangle
  //       fill: colorScale[(datum._x - 1) % colorScale.length],
  //       ...originalStyle
  //     }
  //   : originalStyle;
  const [style, setStyle] = useState(null);
  const [text, setText] = useState(null);
  const [wrappedText, setWrappedText] = useState();
  /* eslint-disable-next-line no-unused-vars */
  const canvas = useMemo(() => document.createElement('canvas'), []);
  useEffect(() => {
    if (originalText) {
      const textToWrap = Array.isArray(originalText)
        ? originalText
        : originalText.split('\n');
      if (width) {
        // NOOP
      } else {
        setWrappedText(textToWrap);
      }
    }
  }, [originalText, width]);
  useEffect(() => {
    if (wrappedText && wrappedText.length) {
      if (highlightIndex && highlightStyle && !style) {
        let wrappedTextStyle = [];
        wrappedText.forEach((wT, i) => {
          const line = Array.isArray(wT) ? wT : [wT];
          const lineStyle =
            i === highlightIndex
              ? { ...highlightStyle, ...originalStyle }
              : { ...originalStyle };
          wrappedTextStyle = wrappedTextStyle.concat(
            Array(line.length).fill(lineStyle)
          );
        });
        setStyle(wrappedTextStyle);
      }
      setText(wrappedText.join('\n'));
    }
  }, [highlightIndex, highlightStyle, originalStyle, style, wrappedText]);

  return <VictoryLabel style={style} text={text} {...props} />;
}

Label.propTypes = {
  colorScale: propTypes.colorScale,
  // TSeems like datum has _x variable that tracks the data index (but it
  // starts from 1).
  datum: PropTypes.shape({ _x: PropTypes.number }),
  highlightIndex: PropTypes.number,
  highlightStyle: PropTypes.shape({}),
  style: PropTypes.oneOfType([
    PropTypes.arrayOf(PropTypes.shape({})),
    PropTypes.shape({})
  ]),
  text: PropTypes.string,
  width: PropTypes.number
};

Label.defaultProps = {
  colorScale: undefined,
  datum: undefined,
  highlightIndex: undefined,
  highlightStyle: { fontWeight: 'bold' },
  style: undefined,
  text: undefined,
  width: undefined
};

export default Label;
