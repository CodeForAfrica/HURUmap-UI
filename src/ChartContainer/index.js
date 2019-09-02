import React, { useEffect } from 'react';
import PropTypes from 'prop-types';

import { makeStyles } from '@material-ui/styles';
import { ButtonBase } from '@material-ui/core';
import Grid from '@material-ui/core/Grid';
import BlockLoader from '../BlockLoader';
import TypographyLoader from '../TypographyLoader';

import infoIcon from '../assets/info.png';
import shareIcon from '../assets/share.png';
import A from '../A';
import DropDown from './DropDown';
import InfoPanel from './InfoPanel';
import SharePanel from './SharePanel';

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
    height: '2.5rem',
    width: '2.5rem',
    '&:first-child': {
      borderRight: 'none'
    }
  },
  title: {},
  subtitle: {},
  sourceLink: {}
});

function ChartContainer({
  content,
  infoComponent: suggestedInfoComponent,
  loading,
  share,
  shareComponent: suggestedShareComponent,
  source,
  title,
  subtitle,
  children
}) {
  const classes = useStyles();
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

  const infoRef = React.useRef(null);
  const [infoAnchorEl, setInfoAnchorEl] = React.useState(null);
  const handleCloseInfo = () => setInfoAnchorEl(null);
  const [infoDropDown, setInfoDropDown] = React.useState(null);
  useEffect(() => {
    let infoComponent = suggestedInfoComponent;
    if (typeof infoComponent === 'undefined') {
      // see: https://material-ui.com/guides/composition/#caveat-with-refs
      const InfoComponent = React.forwardRef((props, ref) => (
        <InfoPanel
          forwardedRef={ref}
          sourceLink={source.url}
          sourceTitle={source.title || source.url}
        >
          Explore Data
        </InfoPanel>
      ));
      infoComponent = <InfoComponent />;
    }
    setInfoDropDown(
      infoComponent ? (
        <DropDown
          anchorEl={infoAnchorEl}
          onClose={handleCloseInfo}
          open={infoAnchorEl !== null}
        >
          {infoComponent}
        </DropDown>
      ) : null
    );
  }, [infoAnchorEl, source.title, source.url, suggestedInfoComponent]);

  const shareRef = React.useRef(null);
  const [shareAnchorEl, setShareAnchorEl] = React.useState(null);
  const [shareDropDown, setShareDropDown] = React.useState(null);
  const handleCloseShare = () => setShareAnchorEl(null);
  useEffect(() => {
    let shareComponent = suggestedShareComponent;
    if (typeof shareComponent === 'undefined') {
      // see: https://material-ui.com/guides/composition/#caveat-with-refs
      const ShareComponent = React.forwardRef((props, ref) => (
        <SharePanel
          forwardedRef={ref}
          title={share.title}
          subtitle={share.subtitle}
        >
          {share.code}
        </SharePanel>
      ));
      shareComponent = <ShareComponent />;
    }
    setShareDropDown(
      shareComponent ? (
        <DropDown
          anchorEl={shareAnchorEl}
          onClose={handleCloseShare}
          open={shareAnchorEl !== null}
        >
          {shareComponent}
        </DropDown>
      ) : null
    );
  }, [
    share.code,
    share.subtitle,
    share.title,
    shareAnchorEl,
    suggestedShareComponent
  ]);

  function handleClickInfo(anchorEl) {
    setShareAnchorEl(null);
    setInfoAnchorEl(anchorEl);
  }

  function handleClickShare(anchorEl) {
    setInfoAnchorEl(null);
    setShareAnchorEl(anchorEl);
  }

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
          {infoDropDown && (
            <BlockLoader loading={loading} width="2.5rem" height="2.5rem">
              <ButtonBase
                className={classes.button}
                onClick={() => handleClickInfo(getReferenceObject(infoRef))}
                ref={infoRef}
              >
                <img alt="Info" src={infoIcon} />
              </ButtonBase>
            </BlockLoader>
          )}

          {shareDropDown && (
            <BlockLoader loading={loading} width="2.5rem" height="2.5rem">
              <ButtonBase
                className={classes.button}
                onClick={() => handleClickShare(getReferenceObject(infoRef))}
                ref={shareRef}
              >
                <img alt="Share" src={shareIcon} />
              </ButtonBase>
            </BlockLoader>
          )}

          {infoDropDown}
          {shareDropDown}
        </Grid>
      </Grid>
      <Grid
        container
        justify="center"
        className={classes.content}
        style={{ width: content.width, height: content.height }}
      >
        <BlockLoader loading={loading}>{children}</BlockLoader>
      </Grid>
      <TypographyLoader
        loading={loading}
        loader={{
          primaryOpacity: 0.5,
          secondaryOpacity: 1
        }}
        component="span"
      >
        <A className={classes.sourceLink} href={source.url}>
          {source.title || source.url}
        </A>
      </TypographyLoader>
    </Grid>
  );
}

ChartContainer.propTypes = {
  children: PropTypes.oneOfType([
    PropTypes.arrayOf(PropTypes.node),
    PropTypes.node
  ]).isRequired,
  infoComponent: PropTypes.node,
  shareComponent: PropTypes.node,
  source: PropTypes.shape({
    title: PropTypes.string,
    url: PropTypes.string.isRequired
  }),
  share: PropTypes.shape({
    title: PropTypes.string.isRequired,
    subtitle: PropTypes.string,
    code: PropTypes.string
  }),
  subtitle: PropTypes.string.isRequired,
  title: PropTypes.string.isRequired,
  loading: PropTypes.bool,
  content: PropTypes.shape({
    width: PropTypes.oneOfType([PropTypes.number, PropTypes.string]),
    height: PropTypes.oneOfType([PropTypes.number, PropTypes.string])
  })
};

ChartContainer.defaultProps = {
  infoComponent: undefined,
  share: {
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
  shareComponent: undefined,
  source: {
    url: 'https://codeforafrica.org',
    title: 'Code for Africa'
  },
  loading: false,
  content: {
    width: '100%',
    height: '100%'
  }
};

export default ChartContainer;
