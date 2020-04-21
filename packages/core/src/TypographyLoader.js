import React, { useRef, useMemo } from "react";
import { Typography } from "@material-ui/core";
import PropTypes from "prop-types";

import ContentLoader from "./ContentLoader";

export default function TypographyLoader({
  loading,
  loader,
  children,
  ...props
}) {
  const ref = useRef();
  const height = useMemo(() => {
    if (loader && loader.height) {
      return loader.height;
    }

    if (ref.current) {
      const typography = ref.current;
      const style = window.getComputedStyle(typography);

      return style.lineHeight;
    }

    return 20;
  }, [loader]);

  return (
    <Typography
      ref={ref}
      style={{ width: "100%", height: "fit-content" }}
      {...props}
    >
      {loading ? (
        <ContentLoader
          primaryOpacity={0.5}
          secondaryOpacity={1}
          height={height}
          {...loader}
        >
          <rect x="0" y="0" width="100%" height="100%" />
        </ContentLoader>
      ) : (
        children
      )}
    </Typography>
  );
}

TypographyLoader.propTypes = {
  children: PropTypes.oneOfType([
    PropTypes.arrayOf(PropTypes.node),
    PropTypes.node,
  ]),
  loading: PropTypes.bool,
  loader: PropTypes.shape({
    width: PropTypes.number,
    height: PropTypes.number,
  }),
};

TypographyLoader.defaultProps = {
  loading: false,
  children: null,
  loader: {},
};
