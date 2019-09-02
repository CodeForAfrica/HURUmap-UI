import React, { useRef, useEffect, useState } from 'react';
import { Typography } from '@material-ui/core';
import PropTypes from 'prop-types';
import ContentLoader from './ContentLoader';

export default function TypographyLoader({
  loading,
  loader,
  children,
  ...props
}) {
  const ref = useRef();
  const [height, setHeight] = useState();
  useEffect(() => {
    if (ref.current) {
      const typography = ref.current;
      const style = window.getComputedStyle(typography);
      setHeight(style.lineHeight);
    }
  }, []);
  return (
    <Typography ref={ref} {...props}>
      {loading ? (
        <ContentLoader style={{ height, width: '100%' }} {...loader}>
          <rect x="0" y="0" width="100%" height="100%" />
        </ContentLoader>
      ) : (
        children
      )}
    </Typography>
  );
}

TypographyLoader.propTypes = {
  children: PropTypes.node.isRequired,
  loading: PropTypes.bool,
  loader: PropTypes.shape({
    width: PropTypes.oneOfType([PropTypes.number, PropTypes.string]),
    height: PropTypes.oneOfType([PropTypes.number, PropTypes.string])
  })
};

TypographyLoader.defaultProps = {
  loading: false,
  loader: {
    width: '100%',
    height: '20px'
  }
};
