/* eslint-disable react/no-danger */
import React from 'react';

import makeStyles from '../makeStyles';

import InsightContainer from '../InsightContainer';

import propTypes from '../propTypes';

const useStyles = makeStyles({
  iframe: {
    width: '100%'
  },
  statViz: {
    display: 'none'
  }
});

function ChartContainer({
  hideStat,
  hideInsight,
  dataLinkGeoId,
  dataLinkTitle,
  dataLinkHref,
  analysisLinkCountrySlug,
  analysisLinkTitle,
  analysisLinkHref,
  insightSummary,
  insightTitle,
  children,
  ...props
}) {
  const classes = useStyles(props);
  return (
    <InsightContainer
      classes={classes}
      hideInsight={hideInsight}
      variant={hideInsight && hideStat ? 'analysis' : 'data'}
      insight={
        !hideInsight
          ? {
              description: insightSummary,
              title: insightTitle,
              analysisLink: {
                href:
                  typeof analysisLinkHref === 'string'
                    ? analysisLinkHref
                    : analysisLinkHref(analysisLinkCountrySlug),
                title: analysisLinkTitle
              },
              dataLink: {
                href:
                  typeof dataLinkHref === 'string'
                    ? dataLinkHref
                    : dataLinkHref(dataLinkGeoId),
                title: dataLinkTitle
              }
            }
          : {}
      }
      {...props}
    >
      {children}
    </InsightContainer>
  );
}

ChartContainer.propTypes = {
  id: propTypes.string,
  title: propTypes.string,
  description: propTypes.string,
  hideInsight: propTypes.bool,
  hideStat: propTypes.bool,
  insightSummary: propTypes.string,
  insightTitle: propTypes.string,
  handleShare: propTypes.func,
  embedCode: propTypes.string,
  dataLinkGeoId: propTypes.string,
  dataLinkTitle: propTypes.string,
  dataLinkHref: propTypes.oneOfType([propTypes.string, propTypes.func]),
  analysisLinkCountrySlug: propTypes.string,
  analysisLinkTitle: propTypes.string,
  analysisLinkHref: propTypes.oneOfType([propTypes.string, propTypes.func]),
  children: propTypes.children.isRequired
};

ChartContainer.defaultProps = {
  title: undefined,
  description: undefined,
  id: undefined,
  hideStat: true,
  hideInsight: true,
  insightSummary: undefined,
  insightTitle: undefined,
  embedCode: '',
  handleShare: () => {},
  dataLinkGeoId: undefined,
  dataLinkTitle: undefined,
  dataLinkHref: undefined,
  analysisLinkCountrySlug: undefined,
  analysisLinkTitle: undefined,
  analysisLinkHref: undefined
};

export default ChartContainer;
