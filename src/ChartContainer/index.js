import React, { useEffect } from 'react';
import PropTypes from 'prop-types';

import { makeStyles } from '@material-ui/styles';
import { ButtonBase } from '@material-ui/core';
import Grid from '@material-ui/core/Grid';
import BlockLoader from '../BlockLoader';
import TypographyLoader from '../TypographyLoader';

import A from '../A';
import EmbedDropDown from './EmbedDropDown';
import ShareDropDown from './ShareDropDown';

import compareIcon from '../assets/icons/compare.svg';
import dataIcon from '../assets/icons/tablet-reader.svg';
import downloadIcon from '../assets/icons/download.svg';
import embedIcon from '../assets/icons/code.svg';
import shareIcon from '../assets/icons/network-connection.svg';

const useStyles = makeStyles({
  root: {
    width: 'available',
    height: 'auto',
    backgroundColor: '#fff',
    padding: '1.5625rem 1.25rem'
  },
  content: {
    padding: '1.25rem 0',
    overflow: 'hidden'
  },
  button: {
    border: '0.0625rem solid #d8d8d8',
    marginLeft: '-0.0625rem',
    height: '2.5rem',
    width: '2.5rem'
  },
  title: {},
  subtitle: {},
  sourceLink: {
    marginLeft: '50px'
  }
});

function ChartContainer({
  children,
  content,
  embed,
  loading,
  onClickCompare,
  onClickData,
  onClickDownload,
  onClickEmbed: onClickEmbedProp,
  onClickShare: onClickShareProp,
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

  const compareButtonRef = React.useRef(null);

  const dataButtonRef = React.useRef(null);

  const downloadButtonRef = React.useRef(null);

  const [embedAnchorEl, setEmbedAnchorEl] = React.useState(null);
  const embedButtonRef = React.useRef(null);
  const [embedDropDown, setEmbedDropDown] = React.useState(null);
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
        >
          {embed.code}
        </EmbedDropDown>
      ) : null;
      setEmbedDropDown(dropDown);
    }
  }, [embed, embedAnchorEl, onClickEmbedProp]);

  const shareButtonRef = React.useRef(null);
  const [shareAnchorEl, setShareAnchorEl] = React.useState(null);
  const [shareDropDown, setShareDropDown] = React.useState(null);
  const handleCloseShare = () => setShareAnchorEl(null);
  useEffect(() => {
    if (typeof onClickShareProp === 'undefined') {
      const dropDown = shareAnchorEl ? (
        <ShareDropDown
          anchorEl={shareAnchorEl}
          onClose={handleCloseShare}
          sourceLink={sourceLink}
          sourceTitle={sourceTitle}
        >
          Explore Data
        </ShareDropDown>
      ) : null;
      setShareDropDown(dropDown);
    }
  }, [onClickShareProp, shareAnchorEl, sourceLink, sourceTitle]);

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
    <Grid container className={classes.root}>
      <Grid
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
        >
          {onClickShare && (
            <BlockLoader loading={loading} width="2.5rem" height="2.5rem">
              <ButtonBase
                className={classes.button}
                onClick={() => onClickShare(getReferenceObject(shareButtonRef))}
                ref={shareButtonRef}
              >
                <img alt="Share" src={shareIcon} />
              </ButtonBase>
            </BlockLoader>
          )}

          {onClickDownload && (
            <BlockLoader loading={loading} width="2.5rem" height="2.5rem">
              <ButtonBase
                className={classes.button}
                onClick={() =>
                  onClickDownload(getReferenceObject(downloadButtonRef))
                }
                ref={downloadButtonRef}
              >
                <img alt="Download" src={downloadIcon} />
              </ButtonBase>
            </BlockLoader>
          )}

          {onClickEmbed && (
            <BlockLoader loading={loading} width="2.5rem" height="2.5rem">
              <ButtonBase
                className={classes.button}
                onClick={() => onClickEmbed(getReferenceObject(embedButtonRef))}
                ref={embedButtonRef}
              >
                <img alt="Embed" src={embedIcon} />
              </ButtonBase>
            </BlockLoader>
          )}

          {onClickCompare && (
            <BlockLoader loading={loading} width="2.5rem" height="2.5rem">
              <ButtonBase
                className={classes.button}
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
            <BlockLoader loading={loading} width="2.5rem" height="2.5rem">
              <ButtonBase
                className={classes.button}
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
        container
        justify="center"
        className={classes.content}
        style={{ width: content.width, height: content.height }}
      >
        <div>
          <BlockLoader loading={loading}>{children}</BlockLoader>
          <TypographyLoader
            loading={loading}
            loader={{
              primaryOpacity: 0.5,
              secondaryOpacity: 1
            }}
            component="span"
          >
            <A className={classes.sourceLink} href={sourceLink}>
              {`Source: ${sourceTitle || sourceLink}`}
            </A>
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
style="margin: 1em; max-width: 300px;"
/>
<script src="https://tanzania.hurumap.org/static/js/embed.chart.make.js" />`
  },
  onClickCompare: undefined,
  onClickData: undefined,
  onClickDownload: undefined,
  onClickEmbed: undefined,
  onClickShare: undefined,
  sourceLink: undefined,
  sourceTitle: undefined,
  loading: false,
  content: {
    width: '100%',
    height: '100%'
  }
};

export default ChartContainer;
