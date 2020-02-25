import React, { useEffect, useState } from 'react';

import Snippet from '../../core/Snippet';
import FlourishChart from './FlourishChart';
import HURUmapChart from './HURUmapChart';
import ChartContainer from './ChartContainer';

import PDFDataContainer from '../../core/PDFDataContainer';

import { shareIndicator } from '../utils';

import propTypes from '../propTypes';

export default function Card({
  id,
  logo,
  type,
  title,
  description,
  showInsight,
  insightSummary,
  insightTitle,
  dataLinkGeoId,
  dataLinkTitle,
  dataLinkHref,
  analysisLinkCountrySlug,
  analysisLinkTitle,
  analysisLinkHref,
  showStatVisual,
  definition: propDefinition,
  embedCode,
  geoId,
  chartWidth,
  parentEl,
  flourishURL,
  fetchDefinition,
  fetchDefinitionUrl,
  shareEndPoint,
  blockSrc,
  sourceLink,
  sourceTitle,
  widget,
  ...props
}) {
  const [definition, setDefinition] = useState();
  useEffect(() => {
    if (fetchDefinition) {
      fetchDefinition(type, id).then(setDefinition);
    } else if (fetchDefinitionUrl) {
      fetch(
        typeof fetchDefinitionUrl === 'string'
          ? fetchDefinitionUrl
          : fetchDefinitionUrl(type, id)
      )
        .then(res => res.json())
        .then(setDefinition);
    } else {
      setDefinition(propDefinition);
    }
  }, [id, type, fetchDefinition, fetchDefinitionUrl, propDefinition]);
  switch (type) {
    case 'indicator':
      return (
        <ChartContainer
          logo={logo}
          hideInsight
          hideStat
          title={title}
          description={description}
          actions={{ handleDownload: null }}
          source={
            sourceLink || sourceTitle
              ? {
                  title: sourceTitle,
                  href: sourceLink
                }
              : undefined
          }
          {...props}
        >
          <div />
          <>
            {(widget === 'image' || widget === 'image_widget') && (
              <img style={{ width: '100%' }} src={blockSrc} alt="indicator" />
            )}
            {(widget === 'html' || widget === 'raw_html_widget') && (
              <div dangerouslySetInnerHTML={{ __html: blockSrc }} />
            )}
            {(widget === 'document' || widget === 'document_widget') && (
              <PDFDataContainer title={title} source={blockSrc} />
            )}
          </>
        </ChartContainer>
      );
    case 'flourish':
      return (
        <FlourishChart
          logo={logo}
          chartId={id}
          dataGeoId={dataLinkGeoId}
          title={title || (definition && definition.title)}
          description={description || (definition && definition.description)}
          showInsight={showInsight}
          insightSummary={insightSummary}
          insightTitle={insightTitle}
          dataLinkTitle={dataLinkTitle}
          analysisLinkCountrySlug={analysisLinkCountrySlug}
          analysisLinkTitle={analysisLinkTitle}
          dataLinkHref={dataLinkHref}
          analysisLinkHref={analysisLinkHref}
          // eslint-disable-next-line react/jsx-no-bind
          handleShare={shareIndicator.bind(null, id, geoId, shareEndPoint)}
          embedCode={
            typeof embedCode === 'string'
              ? embedCode
              : embedCode(type, {
                  title: title || (definition && definition.title),
                  id
                })
          }
          src={flourishURL}
          {...props}
        />
      );
    case 'hurumap':
      return (
        <HURUmapChart
          logo={logo}
          geoId={geoId}
          chartId={id}
          chartWidth={chartWidth}
          dataGeoId={dataLinkGeoId}
          showInsight={showInsight}
          showStatVisual={showStatVisual}
          insightSummary={insightSummary}
          insightTitle={insightTitle}
          dataLinkTitle={dataLinkTitle}
          analysisCountry={analysisLinkCountrySlug}
          analysisLinkTitle={analysisLinkTitle}
          dataLinkHref={dataLinkHref}
          analysisLinkHref={analysisLinkHref}
          // eslint-disable-next-line react/jsx-no-bind
          handleShare={shareIndicator.bind(null, id, geoId, shareEndPoint)}
          chart={
            definition && {
              ...definition,
              visual: {
                ...definition.visual,
                queryAlias: 'viz'
              },
              stat: {
                ...definition.stat,
                queryAlias: 'viz'
              }
            }
          }
          embedCode={
            typeof embedCode === 'string'
              ? embedCode
              : embedCode(type, {
                  title: title || (definition && definition.title),
                  id,
                  geoId
                })
          }
          {...props}
        />
      );
    case 'snippet':
      return (
        <Snippet
          fullWidth
          onExpand={expanded => {
            if (!parentEl) {
              return;
            }
            // eslint-disable-next-line no-param-reassign
            parentEl.style.width = !expanded
              ? parentEl.getAttribute('data-width')
              : '100%';

            parentEl.firstChild.scrollIntoView();
          }}
          embed={{
            title: `Embed ${definition &&
              definition.title &&
              definition.title.rendered}`,
            subtitle:
              'Copy the code below, then paste into your own CMS or HTML.',
            code:
              typeof embedCode === 'string'
                ? embedCode
                : embedCode(type, {
                    title:
                      definition &&
                      definition.title &&
                      definition.title.rendered,
                    id
                  })
          }}
          post={
            definition && {
              title: definition.title && definition.title.rendered,
              content: definition.content && definition.content.rendered
            }
          }
          {...props}
        />
      );
    default:
      return null;
  }
}

Card.propTypes = {
  type: propTypes.oneOf(['hurumap', 'flourish', 'snippet', 'indicator'])
    .isRequired,
  parentEl: propTypes.shape({
    style: propTypes.shape({
      width: propTypes.string
    }),
    getAttribute: propTypes.func,
    firstChild: propTypes.shape({
      scrollIntoView: propTypes.func
    }),
    innerChild: propTypes.children
  }),
  id: propTypes.string.isRequired,
  title: propTypes.string,
  showInsight: propTypes.bool,
  insightSummary: propTypes.string,
  insightTitle: propTypes.string,
  description: propTypes.string,
  dataLinkGeoId: propTypes.string,
  dataLinkTitle: propTypes.string,
  dataLinkHref: propTypes.oneOfType([propTypes.string, propTypes.func]),
  analysisLinkCountrySlug: propTypes.string,
  analysisLinkTitle: propTypes.string,
  analysisLinkHref: propTypes.oneOfType([propTypes.string, propTypes.func]),
  flourishURL: propTypes.oneOfType([propTypes.string, propTypes.func]),
  definition: propTypes.shape({
    title: propTypes.oneOfType([
      propTypes.string,
      propTypes.shape({
        rendered: propTypes.string
      })
    ]),
    content: propTypes.oneOfType([
      propTypes.string,
      propTypes.shape({
        rendered: propTypes.string
      })
    ]),
    description: propTypes.string,
    visual: propTypes.shape({}),
    stat: propTypes.shape({})
  }),
  embedCode: propTypes.oneOfType([propTypes.string, propTypes.func]),
  showStatVisual: propTypes.bool,
  chartWidth: propTypes.string,
  geoId: propTypes.string,
  fetchDefinition: propTypes.func,
  fetchDefinitionUrl: propTypes.oneOfType([propTypes.string, propTypes.func]),
  logo: propTypes.string,
  shareEndPoint: propTypes.string,
  blockSrc: propTypes.string,
  sourceLink: propTypes.string,
  sourceTitle: propTypes.string,
  widget: propTypes.string
};

Card.defaultProps = {
  logo: undefined,
  parentEl: undefined,
  definition: undefined,
  showStatVisual: false,
  showInsight: false,
  insightSummary: '',
  insightTitle: '',
  chartWidth: '',
  geoId: '',
  title: '',
  description: '',
  dataLinkGeoId: undefined,
  dataLinkTitle: undefined,
  analysisLinkCountrySlug: undefined,
  analysisLinkTitle: undefined,
  fetchDefinition: undefined,
  fetchDefinitionUrl: undefined,
  blockSrc: undefined,
  sourceLink: undefined,
  sourceTitle: undefined,
  widget: undefined,
  dataLinkHref: geoId => `/profiles/${geoId}`,
  analysisLinkHref: countrySlug => `/profiles/${countrySlug}`,
  flourishURL: id => `/wp-json/hurumap-data/flourish/${id}/`,
  embedCode: (
    type,
    {
      baseUrl = typeof window !== 'undefined' ? window.location.origin : '',
      title = '',
      geoId,
      id
    }
  ) => {
    switch (type) {
      case 'hurumap':
        return `
        <iframe title="${title}" 
            src="${baseUrl}/embed/hurumap/${geoId}/${id}" />
        `;
      case 'flourish':
        return `
        <iframe title="${title}" 
            src="${baseUrl}/embed/flourish/${id}" />
        `;
      case 'snippet':
        return `
        <iframe title="${title}" 
            src="${baseUrl}/embed/card/${type}/${id}" />
        `;
      default:
        return '';
    }
  },
  shareEndPoint: undefined
};
