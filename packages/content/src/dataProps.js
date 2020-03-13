import { pickBy } from 'lodash';

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
  BLOCK_ID,
  WIDGET,
  LAYOUT
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
    sourceLink,
    sourceTitle,
    blockId,
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
      id: `${type}-${chartId || postId || blockId}`,
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
      [SOURCE_LINK]: sourceLink,
      [SOURCE_TITLE]: sourceTitle,
      [WIDGET]: widget,
      [BLOCK_ID]: blockId,
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
      id: id || `${type}-${chartId || postId}`,
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
