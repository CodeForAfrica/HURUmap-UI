import React from "react";
import ReactDOM from "react-dom";

import { Card } from "@hurumap-ui/core";

import {
  TITLE,
  DESCRIPTION,
  CHART_ID,
  CHART_TITLE,
  CHART_DESCRIPTION,
  SHOW_INSIGHT,
  ANALYSIS_COUNTRY,
  ANALYSIS_LINK_TITLE,
  GEO_ID,
  INSIGHT_TITLE,
  INSIGHT_SUMMARY,
  SHOW_STAT_VISUAL,
  DATA_GEO_ID,
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
  BLOCK_ID,
  ID,
} from "./attributes";

export const TYPES = {
  HURUMAP_CARD: "hurumap-card",
  HURUMAP_CHART: "indicator-hurumap",
  FLOURISH_CHART: "indicator-flourish",
  INDICATOR_WIDGET: "indicator-block",
};

// No SSR Support
export default function renderBlocks({
  // eslint-disable-next-line react/prop-types
  logo,
  // eslint-disable-next-line react/prop-types
  flourishURL,
  // eslint-disable-next-line react/prop-types
  fetchDefinition,
  // eslint-disable-next-line react/prop-types
  fetchDefinitionUrl,
}) {
  return (
    <>
      {Array.from(
        document.querySelectorAll(`div[id^=${TYPES.INDICATOR_WIDGET}]`)
      ).map((el) => {
        const htmlSrc = el.innerHTML;
        // eslint-disable-next-line no-param-reassign
        el.innerHTML = "";
        return ReactDOM.createPortal(
          <Card
            id={el.getAttribute(BLOCK_ID) || el.getAttribute(ID)}
            type="indicator"
            parentEl={el}
            logo={logo}
            title={el.getAttribute(TITLE)}
            description={el.getAttribute(DESCRIPTION)}
            sourceTitle={el.getAttribute(SOURCE_TITLE)}
            sourceLink={el.getAttribute(SOURCE_LINK)}
            blockSrc={el.getAttribute(SRC) || htmlSrc}
            widget={el.getAttribute(WIDGET) || el.getAttribute(LAYOUT)}
          />,
          el
        );
      })}
      {Array.from(
        document.querySelectorAll(`div[id^=${TYPES.HURUMAP_CARD}]`)
      ).map((el) =>
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
      ).map((el) =>
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
            showInsight={el.getAttribute(SHOW_INSIGHT) === "true"}
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
      ).map((el) =>
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
            showInsight={el.getAttribute(SHOW_INSIGHT) === "true"}
            showStatVisual={
              (el.getAttribute(SHOW_STATVISUAL) ||
                el.getAttribute(SHOW_STAT_VISUAL)) === "true"
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
