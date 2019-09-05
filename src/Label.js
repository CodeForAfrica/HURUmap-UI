import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';

import { VictoryLabel } from 'victory';

const canvas = document.createElement('canvas');

/**
 * While VictoryLabel can handle array of strings, it can not handle wrapping
 * for a long string. We need this component to help breakdown long strings
 * but yet, reuse everything VictoryLabel offers: styling, etc.
 *
 * @param {*} param0 .
 */
function Label({ text: originalText, width, ...props }) {
  const [text, setText] = useState(originalText);
  useEffect(() => {
    if (originalText && width) {
      const words = originalText.split(/\s+/).reverse();
      const textLines = [];
      let word = words.pop();
      let line = [];

      while (word) {
        line.push(word);
        const textContent = line.join(' ');
        const { width: measuredWidth } = Label.canvasContext.measureText(
          textContent
        );
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
      setText(textLines.join('\n'));
    }
  }, [originalText, width]);

  return <VictoryLabel text={text} {...props} />;
}

// Creating canvas and context is any expensive operation so lets reuse the
// context.
Label.canvasContext = canvas.getContext('2d');

Label.propTypes = {
  text: PropTypes.string,
  width: PropTypes.number
};

Label.defaultProps = {
  text: undefined,
  width: undefined
};

export default Label;
