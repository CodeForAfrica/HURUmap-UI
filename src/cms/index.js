import React from 'react';
import ReactDOM from 'react-dom';

import { pickBy } from 'lodash';
import Card from '../components/Card';

import {
  TITLE,
  DESCRIPTION,
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
  DATA_GEOID,
  SOURCE_LINK,
  SOURCE_TITLE,
  SRC,
  WIDGET,
  LAYOUT,
  BLOCK_ID
} from './attributes';

export const TYPES = {
  HURUMAP_CARD: 'hurumap-card',
  HURUMAP_CHART: 'indicator-hurumap',
  FLOURISH_CHART: 'indicator-flourish',
  INDICATOR_WIDGET: 'indicator-block'
};

export function dataProps(
  type,
  {
    chartId,
    chartWidth,
    cardWidth,
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
    postType,
    blockId,
    sourceLink,
    sourceTitle,
    src,
    widget
  }
) {
  /**
   * NOTE:
   * - Only use *none* deprecated attributes below
   * - The order of attributes matter
   */
  return pickBy(
    {
      id: `${type}-${chartId || postId}`,
      style: {
        width:
          chartWidth ||
          cardWidth ||
          (type === TYPES.FLOURISH_CHART ? '100%' : undefined)
      },
      [POST_ID]: chartId || postId,
      [POST_TYPE]: postType,
      [GEO_ID]: geoId,
      [TITLE]: title,
      [DESCRIPTION]: description,
      [SHOW_INSIGHT]: showInsight,
      [INSIGHT_TITLE]: insightTitle,
      [INSIGHT_SUMMARY]: insightSummary,
      [DATA_GEO_ID]: dataGeoId,
      [DATA_LINK_TITLE]: dataLinkTitle,
      [ANALYSIS_COUNTRY]: analysisCountry,
      [ANALYSIS_LINK_TITLE]: analysisLinkTitle,
      [SHOW_STAT_VISUAL]: showStatVisual,
      [WIDTH]: chartWidth || cardWidth,
      [BLOCK_ID]: blockId,
      [SOURCE_LINK]: sourceLink,
      [SOURCE_TITLE]: sourceTitle,
      [WIDGET]: widget,
      [SRC]: src
    },
    v => v !== undefined && v !== null
  );
}

export function deprecatedProps(
  type,
  {
    id,
    chartId,
    chartWidth,
    cardWidth,
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
    postType,
    widget
  }
) {
  /**
   * NOTE:
   * - The order of attributes matter
   */
  return pickBy(
    {
      id: `${type}-${chartId || id}`,
      style: pickBy(
        {
          // Margins are deprecated in favor of wp align classnames
          marginLeft: type === TYPES.HURUMAP_CARD ? 10 : undefined,
          marginBottom: type === TYPES.HURUMAP_CARD ? 10 : undefined,
          width:
            chartWidth ||
            cardWidth ||
            (type === TYPES.FLOURISH_CHART ? '100%' : undefined)
        },
        v => v !== undefined && v !== null
      ),
      [CHART_ID]: chartId,
      [CHART_TITLE]: title,
      [CHART_DESCRIPTION]: description,
      [POST_TYPE]: postType,
      [POST_ID]: postId,
      [GEO_TYPE]: geoId,
      [SHOW_INSIGHT]: showInsight,
      [SHOW_STATVISUAL]: showStatVisual,
      [INSIGHT_TITLE]: insightTitle,
      [INSIGHT_SUMMARY]: insightSummary,
      [DATA_LINK_TITLE]: dataLinkTitle,
      [ANALYSIS_COUNTRY]: analysisCountry,
      [ANALYSIS_LINK_TITLE]: analysisLinkTitle,
      [DATA_GEOID]: type === TYPES.HURUMAP_CHART ? dataGeoId : undefined,
      [DATA_GEO_ID]: type === TYPES.FLOURISH_CHART ? dataGeoId : undefined,
      [WIDTH]: chartWidth || cardWidth,
      [LAYOUT]: widget
    },
    v => v !== undefined && v !== null
  );
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
        document.querySelectorAll(
          `div[data-block-id^=${TYPES.INDICATOR_WIDGET}]`
        )
      ).map(el =>
        ReactDOM.createPortal(
          <Card
            id={el.getAttribute(BLOCK_ID)}
            type="indicator"
            parentEl={el}
            logo={logo}
            title={el.getAttribute(TITLE)}
            description={el.getAttribute(DESCRIPTION)}
            sourceTitle={el.getAttribute(SOURCE_TITLE)}
            sourceLink={el.getAttribute(SOURCE_LINK)}
            blockSrc={el.getAttribute(SRC)}
            widget={el.getAttribute(WIDGET) || el.getAttribute(LAYOUT)}
          />,
          el
        )
      )}
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
            type="flourish"
            flourishURL={flourishURL}
            fetchDefinition={fetchDefinition}
            fetchDefinitionUrl={fetchDefinitionUrl}
            id={el.getAttribute(CHART_ID) || el.getAttribute(POST_ID)}
            title={el.getAttribute(CHART_TITLE) || el.getAttribute(TITLE)}
            description={
              el.getAttribute(CHART_DESCRIPTION) || el.getAttribute(DESCRIPTION)
            }
            showInsight={el.getAttribute(SHOW_INSIGHT) === 'true'}
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
      {Array.from(
        document.querySelectorAll(`div[id^=${TYPES.HURUMAP_CHART}]`)
      ).map(el =>
        ReactDOM.createPortal(
          <Card
            parentEl={el}
            fetch={fetch}
            logo={logo}
            type="hurumap"
            fetchDefinition={fetchDefinition}
            fetchDefinitionUrl={fetchDefinitionUrl}
            id={el.getAttribute(CHART_ID) || el.getAttribute(POST_ID)}
            geoId={el.getAttribute(GEO_TYPE) || el.getAttribute(GEO_ID)}
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
