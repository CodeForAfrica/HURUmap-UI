import React, { useMemo } from 'react';

import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import makeStyles from '@material-ui/core/styles/makeStyles';

import ChartFactory from '../../factory/ChartFactory';
import useProfileLoader from '../../factory/useProfileLoader';

import propTypes from '../propTypes';
import ChartContainer from './ChartContainer';

const useStyles = makeStyles({
  statViz: {
    display: 'none'
  }
});

function HURUmapChart({
  geoId,
  chartId,
  charts,
  chart: propChart,
  showInsight,
  showStatVisual,
  insightSummary,
  insightTitle,
  dataLinkGeoId,
  dataLinkTitle,
  dataLinkHref,
  analysisLinkCountrySlug,
  analysisLinkTitle,
  analysisLinkHref,
  embedCode,
  ...props
}) {
  const classes = useStyles(props);
  const chart = useMemo(
    () => propChart || charts.find(c => `${c.id}` === chartId),
    [propChart, charts, chartId]
  );

  const visuals = useMemo(() => (chart ? [chart.visual] : []), [chart]);

  const { profiles, chartData } = useProfileLoader({ geoId, visuals });

  const source = useMemo(() => {
    const { isLoading, profileVisualsData } = chartData;

    if (!chart || isLoading) {
      return null;
    }

    const {
      visual: { queryAlias }
    } = chart;

    const sourceResult = profileVisualsData[`${queryAlias}Source`];
    return sourceResult && sourceResult.nodes && sourceResult.nodes.length
      ? sourceResult.nodes[0]
      : null;
  }, [chart, chartData]);

  if (
    !chart ||
    (!chartData.isLoading &&
      chartData.profileVisualsData[chart.visual.queryAlias] &&
      chartData.profileVisualsData[chart.visual.queryAlias].nodes.length === 0)
  ) {
    return (
      <Grid container justify="center" alignItems="center">
        <Typography>Data is missing for visualizing this chart.</Typography>
      </Grid>
    );
  }
  return (
    <ChartContainer
      key={chart.id}
      title={chart.title}
      description={chart.description && chart.description[geoId]}
      hideInsight={!showInsight}
      hideStat={!showStatVisual}
      loading={chartData.isLoading}
      classes={!showStatVisual && { highlightGrid: classes.statViz }}
      source={source}
      embedCode={embedCode}
      action={{
        handleShare: () => {}
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
      {!chartData.isLoading && showStatVisual ? (
        <ChartFactory
          profiles={profiles}
          definition={chart.stat}
          data={chartData.profileVisualsData[chart.visual.queryAlias].nodes}
        />
      ) : (
        <div />
      )}
      {!chartData.isLoading && (
        <ChartFactory
          profiles={profiles}
          definition={{ id: `data-indicator-${chart.id}`, ...chart.visual }}
          data={chartData.profileVisualsData[chart.visual.queryAlias].nodes}
        />
      )}
    </ChartContainer>
  );
}

HURUmapChart.propTypes = {
  chart: propTypes.shape({
    id: propTypes.string,
    published: propTypes.oneOfType([propTypes.string, propTypes.bool]),
    title: propTypes.string,
    subtitle: propTypes.string,
    section: propTypes.string,
    type: propTypes.string,
    visual: propTypes.shape({
      queryAlias: propTypes.string,
      table: propTypes.string
    }),
    description: propTypes.shape({}),
    stat: propTypes.shape({
      queryAlias: propTypes.string
    }),
    queryAlias: propTypes.string
  }),
  charts: propTypes.arrayOf(
    propTypes.shape({
      id: propTypes.string,
      description: propTypes.shape({})
    })
  ),
  geoId: propTypes.string,
  chartId: propTypes.string,
  showInsight: propTypes.bool,
  showStatVisual: propTypes.bool,
  insightSummary: propTypes.string,
  insightTitle: propTypes.string,
  dataLinkGeoId: propTypes.string,
  dataLinkTitle: propTypes.string,
  dataLinkHref: propTypes.oneOfType([propTypes.string, propTypes.func]),
  analysisLinkCountrySlug: propTypes.string,
  analysisLinkTitle: propTypes.string,
  analysisLinkHref: propTypes.oneOfType([propTypes.string, propTypes.func]),
  embedCode: propTypes.string
};

HURUmapChart.defaultProps = {
  chart: undefined,
  charts: [],
  geoId: undefined,
  chartId: undefined,
  showInsight: undefined,
  showStatVisual: undefined,
  insightSummary: undefined,
  insightTitle: undefined,
  dataLinkGeoId: undefined,
  dataLinkTitle: undefined,
  dataLinkHref: geoId => `/profiles/${geoId}`,
  analysisLinkCountrySlug: undefined,
  analysisLinkTitle: undefined,
  analysisLinkHref: countrySlug => `/profiles/${countrySlug}`,
  embedCode: ''
};

export default HURUmapChart;
