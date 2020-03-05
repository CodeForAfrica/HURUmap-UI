/* eslint-disable react/no-danger */
import React from 'react';

import makeStyles from '../../core/styles/makeStyles';

import propTypes from '../propTypes';
import ChartContainer from './ChartContainer';

const useStyles = makeStyles({
  iframe: {
    width: '100%'
  },
  statViz: {
    display: 'none'
  }
});

function FlourishChart({
  src,
  title,
  description,
  chartId,
  iframeKey,
  showInsight,
  insightSummary,
  insightTitle,
  dataLinkGeoId,
  dataLinkTitle,
  dataLinkHref,
  analysisLinkCountrySlug,
  analysisLinkTitle,
  analysisLinkHref,
  handleShare,
  embedCode,
  ...props
}) {
  const classes = useStyles(props);
  return (
    <ChartContainer
      key={chartId}
      // Always hide stat visual for flourish
      classes={{ highlightGrid: classes.statViz }}
      // No loader design for flourish
      loading={false}
      hideStat={!showInsight}
      hideInsight={!showInsight}
      title={title}
      description={description}
      embedCode={embedCode}
      actions={{
        handleShare
      }}
      insightSummary={insightSummary}
      insightTitle={insightTitle}
      dataLinkGeoId={dataLinkGeoId}
      dataLinkTitle={dataLinkTitle}
      dataLinkHref={dataLinkHref}
      analysisLinkCountrySlug={analysisLinkCountrySlug}
      analysisLinkTitle={analysisLinkTitle}
      analysisLinkHref={analysisLinkHref}
    >
      <div />
      <iframe
        id={`data-indicator-${chartId}`}
        key={iframeKey}
        frameBorder="0"
        scrolling="no"
        title={title}
        src={typeof src === 'string' ? src : src(chartId)}
        className={classes.iframe}
      />
    </ChartContainer>
  );
}

FlourishChart.propTypes = {
  title: propTypes.string,
  description: propTypes.string,
  chartId: propTypes.string,
  iframeKey: propTypes.number,
  showInsight: propTypes.bool,
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
  src: propTypes.oneOfType([propTypes.string, propTypes.func]).isRequired
};

FlourishChart.defaultProps = {
  title: undefined,
  description: undefined,
  chartId: undefined,
  iframeKey: undefined,
  showInsight: undefined,
  insightSummary: undefined,
  insightTitle: undefined,
  embedCode: '',
  handleShare: () => {},
  dataLinkGeoId: undefined,
  dataLinkTitle: undefined,
  dataLinkHref: geoId => `/profiles/${geoId}`,
  analysisLinkCountrySlug: undefined,
  analysisLinkTitle: undefined,
  analysisLinkHref: countrySlug => `/profiles/${countrySlug}`
};

export default FlourishChart;
