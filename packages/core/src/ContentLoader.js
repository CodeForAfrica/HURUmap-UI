import React, { useState, useEffect, useMemo } from "react";
import PropTypes from "prop-types";
import ContentLoader from "react-content-loader";
import shortid from "shortid";

export default function CustomContentLoader({
  id: propId,
  children,
  height,
  width,
  ...props
}) {
  const id = useMemo(() => propId || shortid.generate(), [propId]);
  const [dimension, setDimension] = useState({
    width: width === undefined ? 0 : width,
    height: height === undefined ? 0 : height,
  });

  useEffect(() => {
    const el = document.getElementById(id);
    if (el) {
      const parentEl = el.parentElement;
      if (parentEl) {
        const rect = parentEl.getBoundingClientRect();
        const style = window.getComputedStyle(parentEl);
        setDimension({
          width:
            width === undefined
              ? rect.width -
                parseFloat(style.paddingLeft.replace("px", "")) -
                parseFloat(style.paddingRight.replace("px", "")) -
                parseFloat(style.marginLeft.replace("px", "")) -
                parseFloat(style.marginRight.replace("px", ""))
              : width,
          height:
            height === undefined
              ? rect.height -
                parseFloat(style.paddingTop.replace("px", "")) -
                parseFloat(style.paddingBottom.replace("px", "")) -
                parseFloat(style.marginTop.replace("px", "")) -
                parseFloat(style.marginBottom.replace("px", ""))
              : height,
        });
      }
    }
  }, [id, width, height]);

  return (
    <ContentLoader
      id={id}
      primaryOpacity={0.01}
      secondaryOpacity={0.1}
      width={dimension.width}
      height={dimension.height}
      viewBox={`0 0 ${dimension.width} ${dimension.height}`}
      style={{ ...dimension }}
      {...props}
    >
      {children}
    </ContentLoader>
  );
}

CustomContentLoader.propTypes = {
  id: PropTypes.string,
  children: PropTypes.oneOfType([
    PropTypes.arrayOf(PropTypes.node),
    PropTypes.node,
  ]).isRequired,
  width: PropTypes.number,
  height: PropTypes.number,
};

CustomContentLoader.defaultProps = {
  id: undefined,
  width: undefined,
  height: undefined,
};
