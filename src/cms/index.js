import React from 'react';
import ReactDOM from 'react-dom';

import Visual from '../components/Visual';

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
    'data-chart-id': chartId,
    'data-chart-title': title,
    'data-chart-description': description,
    'data-show-insight': showInsight,
    'data-insight-title': insightTitle,
    'data-insight-summary': insightSummary,
    'data-data-link-title': dataLinkTitle,
    'data-analysis-country': analysisCountry,
    'data-analysis-link-title': analysisLinkTitle,
    'data-geo-id': geoId,
    'data-data-geo-id': dataGeoId,
    'data-show-statvisual': showStatVisual,
    'data-width': chartWidth,
    'data-post-type': postType,
    'data-post-id': postId
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
          <Visual
            parentEl={el}
            logo={logo}
            fetchDefinition={fetchDefinition}
            fetchDefinitionUrl={fetchDefinitionUrl}
            id={el.getAttribute('data-post-id')}
            type={el.getAttribute('data-post-type')}
          />,
          el
        )
      )}
      {Array.from(
        document.querySelectorAll(`div[id^=${TYPES.FLOURISH_CHART}]`)
      ).map(el =>
        ReactDOM.createPortal(
          <Visual
            parentEl={el}
            logo={logo}
            flourishURL={flourishURL}
            fetchDefinition={fetchDefinition}
            fetchDefinitionUrl={fetchDefinitionUrl}
            id={el.getAttribute('data-chart-id')}
            title={el.getAttribute('data-chart-title')}
            description={el.getAttribute('data-chart-description')}
            showInsight={el.getAttribute('data-show-insight') === 'true'}
            insightTitle={el.getAttribute('data-insight-title')}
            insightSummary={el.getAttribute('data-insight-summary')}
            analysisLinkCountrySlug={el.getAttribute('data-analysis-country')}
            analysisLinkTitle={el.getAttribute('data-analysis-link-title')}
            dataLinkTitle={el.getAttribute('data-data-link-title')}
            dataLinkGeoId={el.getAttribute('data-data-geo-id')}
          />,
          el
        )
      )}
      {Array.from(
        document.querySelectorAll(`div[id^=${TYPES.HURUMAP_CHART}]`)
      ).map(el =>
        ReactDOM.createPortal(
          <Visual
            parentEl={el}
            fetch={fetch}
            logo={logo}
            fetchDefinition={fetchDefinition}
            fetchDefinitionUrl={fetchDefinitionUrl}
            chartId={el.getAttribute('data-chart-id')}
            geoId={
              // data-geo-type to support old posts
              el.getAttribute('data-geo-type') || el.getAttribute('data-geo-id')
            }
            showInsight={el.getAttribute('data-show-insight') === 'true'}
            showStatVisual={el.getAttribute('data-show-statvisual') === 'true'}
            insightTitle={el.getAttribute('data-insight-title')}
            insightSummary={el.getAttribute('data-insight-summary')}
            analysisCountry={el.getAttribute('data-analysis-country')}
            analysisLinkTitle={el.getAttribute('data-analysis-link-title')}
            dataLinkTitle={el.getAttribute('data-data-link-title')}
            dataLinkGeoId={el.getAttribute('data-data-geoid')}
          />,
          el
        )
      )}
    </>
  );
}
