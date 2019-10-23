import React, { useEffect, useRef, useState } from 'react';
import PropTypes from 'prop-types';

import domToImage from 'dom-to-image';

import { makeStyles, ButtonBase, Grid } from '@material-ui/core';

import A from '../A';
import BlockLoader from '../BlockLoader';
import EmbedDropDown from './EmbedDropDown';
import ShareDropDown from './ShareDropDown';
import TypographyLoader from '../TypographyLoader';

import compareIcon from '../assets/icons/compare.svg';
import dataIcon from '../assets/icons/tablet-reader.svg';
import downloadIcon from '../assets/icons/download.svg';
import embedIcon from '../assets/icons/code.svg';
import shareIcon from '../assets/icons/network-connection.svg';

const useStyles = makeStyles({
  root: {
    width: 'available',
    backgroundColor: '#fff',
    padding: '1.5625rem 1.25rem'
  },
  content: {
    padding: '1.25rem 0',
    overflow: 'hidden'
  },
  container: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center'
  },
  actions: {},
  actionButton: {
    border: '0.0625rem solid #d8d8d8',
    marginLeft: '-0.0625rem',
    height: '2.5rem',
    width: '2.5rem'
  },
  title: {},
  subtitle: {},
  sourceLink: {
    width: '100%',
    marginLeft: '50px'
  },
  embedRoot: {},
  embedTitle: {},
  embedSubtitle: {},
  embedCode: {},
  embedDropDownRoot: {},
  embedDropDownPaper: {},
  shareRoot: {},
  shareTitle: {},
  shareSocial: {},
  shareUrl: {},
  shareUrlInput: {},
  shareDropDownRoot: {},
  shareDropDownPaper: {}
});

function ChartContainer({
  children,
  content,
  embed,
  loading,
  onClickCompare,
  onClickData,
  onClickDownload: onClickDownloadProp,
  onClickEmbed: onClickEmbedProp,
  onClickShare: onClickShareProp,
  share,
  sourceLink,
  sourceTitle,
  title,
  subtitle,
  ...props
}) {
  const classes = useStyles(props);
  const getReferenceObject = ref => {
    const { current } = ref;
    if (current) {
      return {
        clientHeight: current.clientHeight,
        clientWidth: current.clientWidth,
        getBoundingClientRect: () => current.getBoundingClientRect()
      };
    }
    return null;
  };

  const compareButtonRef = useRef(null);

  const dataButtonRef = useRef(null);

  const downloadButtonRef = useRef(null);
  const chartRef = useRef(null);
  const toPng = () => {
    if (chartRef.current) {
      const filter = node =>
        !(node.classList && node.classList.contains(classes.actions));
      return domToImage.toPng(chartRef.current, { filter });
    }
    return Promise.resolve(undefined);
  };

  const handleDownload = (anchorEl, dataUrl) => {
    if (dataUrl) {
      const link = document.createElement('a');
      link.download = `${title}.png`;
      link.href = dataUrl;

      document.body.appendChild(link); // Firefox requires this
      link.click();
      document.body.removeChild(link);
    }
  };

  const onClickDownload = onClickDownloadProp || handleDownload;

  const [embedAnchorEl, setEmbedAnchorEl] = useState(null);
  const embedButtonRef = useRef(null);
  const [embedDropDown, setEmbedDropDown] = useState(null);
  const handleCloseEmbed = () => setEmbedAnchorEl(null);
  useEffect(() => {
    if (typeof onClickEmbedProp === 'undefined') {
      const dropDown = embedAnchorEl ? (
        <EmbedDropDown
          anchorEl={embedAnchorEl}
          onClose={handleCloseEmbed}
          open={embedAnchorEl === null}
          title={embed.title}
          subtitle={embed.subtitle}
          classes={{
            root: classes.embedRoot,
            title: classes.embedTitle,
            subtitle: classes.embedSubtitle,
            code: classes.embedCode,
            dropDownRoot: classes.embedDropDownRoot,
            dropDownPaper: classes.embedDropDownPaper
          }}
        >
          {embed.code}
        </EmbedDropDown>
      ) : null;
      setEmbedDropDown(dropDown);
    }
  }, [classes, embed, embedAnchorEl, onClickEmbedProp]);

  const shareButtonRef = useRef(null);
  const [shareAnchorEl, setShareAnchorEl] = useState(null);
  const [shareDropDown, setShareDropDown] = useState(null);
  const handleCloseShare = () => setShareAnchorEl(null);
  useEffect(() => {
    if (typeof onClickShareProp === 'undefined') {
      const dropDown = shareAnchorEl ? (
        <ShareDropDown
          {...share}
          anchorEl={shareAnchorEl}
          classes={{
            root: classes.shareRoot,
            title: classes.shareTitle,
            social: classes.shareSocial,
            url: classes.shareUrl,
            urlInput: classes.shareUrlInput,
            dropDownRoot: classes.shareDropDownRoot,
            dropDownPaper: classes.shareDropDownPaper
          }}
          onClose={handleCloseShare}
        >
          Explore Data
        </ShareDropDown>
      ) : null;
      setShareDropDown(dropDown);
    }
  }, [
    classes,
    onClickShareProp,
    share,
    shareAnchorEl,
    sourceLink,
    sourceTitle
  ]);

  const onClickEmbed =
    onClickEmbedProp ||
    (typeof onClickEmbedProp === 'undefined' &&
      (anchorEl => {
        setShareAnchorEl(null);
        setEmbedAnchorEl(anchorEl);
      }));

  const onClickShare =
    onClickShareProp ||
    (typeof onClickShareProp === 'undefined' &&
      (anchorEl => {
        setEmbedAnchorEl(null);
        setShareAnchorEl(anchorEl);
      }));

  return (
    <Grid container className={classes.root} ref={chartRef}>
      <Grid
        item
        xs={12}
        container
        wrap="nowrap"
        direction="row"
        alignItems="flex-start"
        justify="space-between"
      >
        <Grid item xs={8}>
          <TypographyLoader
            loading={loading}
            loader={{
              primaryOpacity: 0.5,
              secondaryOpacity: 1
            }}
            className={classes.title}
            variant="h5"
          >
            {title}
          </TypographyLoader>
          <TypographyLoader
            loading={loading}
            loader={{
              primaryOpacity: 0.5,
              secondaryOpacity: 1
            }}
            className={classes.subtitle}
            variant="h6"
          >
            {subtitle}
          </TypographyLoader>
        </Grid>

        <Grid
          item
          xs={4}
          container
          wrap="nowrap"
          direction="row"
          justify="flex-end"
          className={classes.actions}
        >
          {onClickShare && (
            <BlockLoader loading={loading} width={40} height={40}>
              <ButtonBase
                className={classes.actionButton}
                onClick={() => onClickShare(getReferenceObject(shareButtonRef))}
                ref={shareButtonRef}
              >
                <img alt="Share" src={shareIcon} />
              </ButtonBase>
            </BlockLoader>
          )}

          {onClickEmbed && (
            <BlockLoader loading={loading} width={40} height={40}>
              <ButtonBase
                className={classes.actionButton}
                onClick={() => onClickEmbed(getReferenceObject(embedButtonRef))}
                ref={embedButtonRef}
              >
                <img alt="Embed" src={embedIcon} />
              </ButtonBase>
            </BlockLoader>
          )}

          {onClickDownload && (
            <BlockLoader loading={loading} width={40} height={40}>
              <ButtonBase
                className={classes.actionButton}
                onClick={() =>
                  toPng().then(
                    onClickDownload.bind(
                      null,
                      getReferenceObject(downloadButtonRef)
                    )
                  )
                }
                ref={downloadButtonRef}
              >
                <img alt="Download" src={downloadIcon} />
              </ButtonBase>
            </BlockLoader>
          )}

          {onClickCompare && (
            <BlockLoader loading={loading} width={40} height={40}>
              <ButtonBase
                className={classes.actionButton}
                onClick={() =>
                  onClickCompare(getReferenceObject(compareButtonRef))
                }
                ref={compareButtonRef}
              >
                <img alt="Compare" src={compareIcon} />
              </ButtonBase>
            </BlockLoader>
          )}

          {onClickData && (
            <BlockLoader loading={loading} width={40} height={40}>
              <ButtonBase
                className={classes.actionButton}
                onClick={() => onClickData(getReferenceObject(dataButtonRef))}
                ref={dataButtonRef}
              >
                <img alt="Show Data" src={dataIcon} />
              </ButtonBase>
            </BlockLoader>
          )}

          {embedDropDown}
          {shareDropDown}
        </Grid>
      </Grid>
      <Grid
        item
        xs={12}
        container
        justify="center"
        className={classes.content}
        style={{ width: content.width, height: content.height }}
      >
        {/* Set width 100% only when loading to allow Chart to define its own width
            otherwise a chart with a small width will scale and look large. */}
        <div
          style={{ width: loading && '100%', height: '100%' }}
          className={classes.container}
        >
          <BlockLoader loading={loading}>{children}</BlockLoader>
          <TypographyLoader
            loading={loading}
            loader={{
              primaryOpacity: 0.5,
              secondaryOpacity: 1
            }}
            component="div"
            style={{ width: '100%' }}
          >
            {sourceLink && (
              <A className={classes.sourceLink} href={sourceLink}>
                {`Source: ${sourceTitle || sourceLink}`}
              </A>
            )}
          </TypographyLoader>
        </div>
      </Grid>
    </Grid>
  );
}

ChartContainer.propTypes = {
  embed: PropTypes.shape({
    title: PropTypes.string.isRequired,
    subtitle: PropTypes.string,
    code: PropTypes.string
  }),
  children: PropTypes.oneOfType([
    PropTypes.arrayOf(PropTypes.node),
    PropTypes.node
  ]).isRequired,
  onClickCompare: PropTypes.func,
  onClickData: PropTypes.func,
  onClickDownload: PropTypes.func,
  onClickEmbed: PropTypes.func,
  onClickShare: PropTypes.func,
  share: PropTypes.shape({
    email: PropTypes.shape({
      subject: PropTypes.string,
      body: PropTypes.string,
      separator: PropTypes.string
    }),
    facebook: PropTypes.shape({
      url: PropTypes.string,
      quote: PropTypes.string,
      hashtag: PropTypes.string
    }),
    shareIcon: PropTypes.shape({
      round: PropTypes.bool,
      size: PropTypes.number
    }),
    twitter: PropTypes.shape({
      url: PropTypes.string,
      title: PropTypes.string,
      hashtags: PropTypes.string
    })
  }),
  subtitle: PropTypes.string.isRequired,
  title: PropTypes.string.isRequired,
  sourceLink: PropTypes.string,
  sourceTitle: PropTypes.string,
  loading: PropTypes.bool,
  content: PropTypes.shape({
    width: PropTypes.oneOfType([PropTypes.number, PropTypes.string]),
    height: PropTypes.oneOfType([PropTypes.number, PropTypes.string])
  })
};

ChartContainer.defaultProps = {
  embed: {
    title: 'Embed code for this chart',
    subtitle:
      'Copy the code below, then paste into your own CMS or HTML. Embedded charts are responsive to your page width, and have been tested in Firefox, Safari, Chrome, and Edge.',
    code: `<iframe
id="cr-embed-region-11-literacy_and_numeracy_tests-english_test_dist"
className="census-reporter-embed"
src="https://tanzania.hurumap.org/embed/iframe.html?geoID=region-11&geoVersion=2009&chartDataID=literacy_and_numeracy_tests-english_test_dist&dataYear=2015&chartType=pie&chartHeight=200&chartQualifier=&chartRelease=Uwezo+Annual+Assessment+Report+2015&chartSourceTitle=&chartSourceLink=&chartTitle=Percentage+of+children+aged+6-16+passing+English+literacy+tests&chartSubtitle=&initialSort=-value&statType=percentage"
frameBorder="0"
width="100%"
height="300"
style="margin: 1em; max-width: 18.75rem;"
/>
<script src="https://tanzania.hurumap.org/static/js/embed.chart.make.js" />`
  },
  onClickCompare: undefined,
  onClickData: undefined,
  onClickDownload: undefined,
  onClickEmbed: undefined,
  onClickShare: undefined,
  share: {
    // Default to twitter and facebook, sharing window.location.url
    facebook: {},
    twitter: {}
  },
  sourceLink: undefined,
  sourceTitle: undefined,
  loading: false,
  content: {
    width: '100%',
    height: '100%'
  }
};

export default ChartContainer;
