import React from 'react';
import ReactDOM from 'react-dom';

import Card from '../components/Card';

import {
  CHART_ID,
  CHART_TITLE,
  CHART_DESCRIPTION,
  SHOW_INSIGHT,
  DATA_LINK_TITLE,
  ANALYSIS_COUNTRY,
  ANALYSIS_LINK_TITLE,
  GEO_ID,
  INSIGHT_TITLE,
  INSIGHT_SUMMARY,
  SHOW_STAT_VISUAL,
  DATA_GEO_ID,
  WIDTH,
  POST_ID,
  POST_TYPE,
  GEO_TYPE,
  SHOW_STATVISUAL,
  GEOID,
  DATA_GEOID
} from './attributes';

export const TYPES = {
  HURUMAP_CARD: 'hurumap-card',
  HURUMAP_CHART: 'indicator-hurumap',
  FLOURISH_CHART: 'indicator-flourish'
};

export function dataProps(
  type,
  {
    chartId,
    chartWidth,
    title,
    description,
    showInsight,
    insightTitle,
    insightSummary,
    dataLinkTitle,
    analysisCountry,
    analysisLinkTitle,
    dataGeoId,
    geoId,
    showStatVisual,
    postId,
    postType
  }
) {
  return {
    id: `${type}-${chartId}`,
    style: {
      marginLeft: 10,
      marginBottom: 10,
      width: chartWidth
    },
    [CHART_ID]: chartId,
    [CHART_TITLE]: title,
    [CHART_DESCRIPTION]: description,
    [SHOW_INSIGHT]: showInsight,
    [INSIGHT_TITLE]: insightTitle,
    [INSIGHT_SUMMARY]: insightSummary,
    [DATA_LINK_TITLE]: dataLinkTitle,
    [ANALYSIS_COUNTRY]: analysisCountry,
    [ANALYSIS_LINK_TITLE]: analysisLinkTitle,
    [GEO_ID]: geoId,
    [DATA_GEO_ID]: dataGeoId,
    [SHOW_STAT_VISUAL]: showStatVisual,
    [WIDTH]: chartWidth,
    [POST_TYPE]: postType,
    [POST_ID]: postId
  };
}

// No SSR Support
export function renderBlocks({
  // eslint-disable-next-line react/prop-types
  logo,
  // eslint-disable-next-line react/prop-types
  flourishURL,
  // eslint-disable-next-line react/prop-types
  fetchDefinition,
  // eslint-disable-next-line react/prop-types
  fetchDefinitionUrl
}) {
  return (
    <>
      {Array.from(
        document.querySelectorAll(`div[id^=${TYPES.HURUMAP_CARD}]`)
      ).map(el =>
        ReactDOM.createPortal(
          <Card
            parentEl={el}
            logo={logo}
            fetchDefinition={fetchDefinition}
            fetchDefinitionUrl={fetchDefinitionUrl}
            id={el.getAttribute(POST_ID)}
            type={el.getAttribute(POST_TYPE)}
          />,
          el
        )
      )}
      {Array.from(
        document.querySelectorAll(`div[id^=${TYPES.FLOURISH_CHART}]`)
      ).map(el =>
        ReactDOM.createPortal(
          <Card
            parentEl={el}
            logo={logo}
            flourishURL={flourishURL}
            fetchDefinition={fetchDefinition}
            fetchDefinitionUrl={fetchDefinitionUrl}
            id={el.getAttribute(CHART_ID)}
            title={el.getAttribute(CHART_TITLE)}
            description={el.getAttribute(CHART_DESCRIPTION)}
            showInsight={el.getAttribute(SHOW_INSIGHT) === 'true'}
            insightTitle={el.getAttribute(INSIGHT_TITLE)}
            insightSummary={el.getAttribute(INSIGHT_SUMMARY)}
            analysisLinkCountrySlug={el.getAttribute(ANALYSIS_COUNTRY)}
            analysisLinkTitle={el.getAttribute(ANALYSIS_LINK_TITLE)}
            dataLinkTitle={el.getAttribute(ANALYSIS_LINK_TITLTE)}
            dataLinkGeoId={
              el.getAttribute(DATA_GEOID) || el.getAttribute(DATA_GEO_ID)
            }
          />,
          el
        )
      )}
      {Array.from(
        document.querySelectorAll(`div[id^=${TYPES.HURUMAP_CHART}]`)
      ).map(el =>
        ReactDOM.createPortal(
          <Card
            parentEl={el}
            fetch={fetch}
            logo={logo}
            fetchDefinition={fetchDefinition}
            fetchDefinitionUrl={fetchDefinitionUrl}
            chartId={el.getAttribute(CHART_ID)}
            geoId={
              el.getAttribute(GEO_TYPE) ||
              el.getAttribute(GEOID) ||
              el.getAttribute(GEO_ID)
            }
            showInsight={el.getAttribute(SHOW_INSIGHT) === 'true'}
            showStatVisual={
              (el.getAttribute(SHOW_STATVISUAL) ||
                el.getAttribute(SHOW_STAT_VISUAL)) === 'true'
            }
            insightTitle={el.getAttribute(INSIGHT_TITLE)}
            insightSummary={el.getAttribute(INSIGHT_SUMMARY)}
            analysisLinkCountrySlug={el.getAttribute(ANALYSIS_COUNTRY)}
            analysisLinkTitle={el.getAttribute(ANALYSIS_LINK_TITLE)}
            dataLinkTitle={el.getAttribute(ANALYSIS_LINK_TITLE)}
            dataLinkGeoId={
              el.getAttribute(DATA_GEOID) || el.getAttribute(DATA_GEO_ID)
            }
          />,
          el
        )
      )}
    </>
  );
}
