import React, { useEffect, useRef, useState } from 'react';
import PropTypes from 'prop-types';

import { ButtonBase, Grid, Typography } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';

import { domToPng } from '../utils';

import A from '../A';
import BlockLoader from '../BlockLoader';
import EmbedDropDown from './EmbedDropDown';
import ShareDropDown from './ShareDropDown';
import TypographyLoader from '../TypographyLoader';

import defaultLogo from '../assets/logo.png';
import CompareIcon from '../assets/icons/compare.svg';
import DataIcon from '../assets/icons/tablet-reader.svg';
import DownloadIcon from '../assets/icons/download.svg';
import EmbedIcon from '../assets/icons/code.svg';
import ShareIcon from '../assets/icons/network-connection.svg';

const useStyles = makeStyles(({ palette }) => ({
  root: {
    backgroundColor: '#f1f1ed'
  },
  containerRoot: {
    backgroundColor: '#fff',
    width: 'available'
  },
  chart: {
    margin: '1.5625rem 1.25rem'
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
  source: {
    width: '100%'
  },
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
  shareDropDownPaper: {},
  attribution: {
    display: 'none',
    backgroundColor: palette.primary.main,
    padding: '1.5625rem 1.25rem'
  },
  attributionSource: {
    flex: '1 1 300px',
    '& span': {
      color: '#fff'
    }
  },
  attributionLogo: {
    '& img': {
      height: 'auto',
      maxHeight: '2rem',
      maxWidth: '300px',
      width: 'auto'
    }
  },
  descriptionWrapper: {
    marginTop: '1.75rem'
  },
  description: {}
}));

function ChartContainer({
  children,
  content,
  embed,
  loading,
  logo: logoProp,
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
  description,
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
  const downloadHiddenClassName = 'Download--hidden';
  const chartRef = useRef(null);
  const toPng = () => {
    const filter = node => {
      const { classList } = node;
      if (classList) {
        if (classList.contains(classes.attribution)) {
          const { style: nodeStyle } = node;
          nodeStyle.display = 'flex';
        }

        return !classList.contains(downloadHiddenClassName);
      }
      return true;
    };

    return domToPng(chartRef.current, { filter });
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
  const logo = logoProp || defaultLogo;

  return (
    <div ref={chartRef} className={classes.root}>
      <Grid container className={classes.containerRoot}>
        <Grid item xs={12} container className={classes.chart}>
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
                variant="body1"
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
                variant="caption"
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
              className={`${downloadHiddenClassName} ${classes.actions}`}
            >
              {onClickShare && (
                <BlockLoader loading={loading} width={40} height={40}>
                  <ButtonBase
                    className={classes.actionButton}
                    onClick={() =>
                      onClickShare(getReferenceObject(shareButtonRef))
                    }
                    ref={shareButtonRef}
                  >
                    <ShareIcon />
                  </ButtonBase>
                </BlockLoader>
              )}

              {onClickEmbed && (
                <BlockLoader loading={loading} width={40} height={40}>
                  <ButtonBase
                    className={classes.actionButton}
                    onClick={() =>
                      onClickEmbed(getReferenceObject(embedButtonRef))
                    }
                    ref={embedButtonRef}
                  >
                    <EmbedIcon />
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
                    <DownloadIcon />
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
                    <CompareIcon />
                  </ButtonBase>
                </BlockLoader>
              )}

              {onClickData && (
                <BlockLoader loading={loading} width={40} height={40}>
                  <ButtonBase
                    className={classes.actionButton}
                    onClick={() =>
                      onClickData(getReferenceObject(dataButtonRef))
                    }
                    ref={dataButtonRef}
                  >
                    <DataIcon />
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
                className={`${downloadHiddenClassName} ${classes.source}`}
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
      </Grid>
      {description && (
        <Grid
          container
          alignItems="flex-start"
          wrap="nowrap"
          className={classes.descriptionWrapper}
        >
          <Typography variant="caption" className={classes.description}>
            {description}
          </Typography>
        </Grid>
      )}
      <Grid
        container
        alignItems="center"
        justify="space-between"
        wrap="wrap"
        className={classes.attribution}
      >
        <Grid item className={classes.attributionSource}>
          {sourceLink && (
            <Typography variant="caption">{`Source ${sourceLink}`}</Typography>
          )}
        </Grid>
        <Grid item className={classes.attributionLogo}>
          <img src={logo} alt="log" />
        </Grid>
      </Grid>
    </div>
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
  logo: PropTypes.string,
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
  description: PropTypes.string,
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
  description: undefined,
  logo: undefined,
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
