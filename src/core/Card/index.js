import React, { useState } from 'react';
import Box from '@material-ui/core/Box';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import AddIcon from '@material-ui/icons/Add';
import MinimizeIcon from '@material-ui/icons/Remove';

import { makeStyles } from '@material-ui/core/styles';
import { Link } from '@material-ui/core';
import propTypes from '../propTypes';
import CardButton from './Button';
import ContentLoader from '../ContentLoader';
import CardActions from './Actions';

import EmbedDropDown from '../EmbedDropDown';
import ShareDropDown from '../ShareDropDown';

const useStyles = makeStyles(theme => ({
  root: ({ expand, width }) => ({
    borderTop: `2px solid ${theme.palette.primary.main}`,
    position: 'relative',
    backgroundColor: 'whitesmoke',
    width: expand ? '100%' : width || 500,
    height: 'auto',
    padding: 20
  })
}));

function Card({
  fullWidth,
  share,
  embed,
  link,
  post,
  width,
  onExpand,
  ...props
}) {
  const [expand, setExpand] = useState(false);
  const classes = useStyles({
    width: fullWidth ? '100%' : width,
    expand,
    ...props
  });
  const [embedAnchorEl, setEmbedAnchorEl] = useState(null);
  const [shareAnchorEl, setShareAnchorEl] = useState(null);
  const renderPost = () => {
    return (
      <>
        {!link && (
          <>
            <Box position="absolute" top={20} right={20}>
              <CardActions
                onEmbed={e => setEmbedAnchorEl(e.target)}
                onShare={e => setShareAnchorEl(e.target)}
              />
            </Box>
            <ShareDropDown
              {...share}
              anchorEl={shareAnchorEl}
              open={shareAnchorEl !== null}
              onClose={() => setShareAnchorEl(null)}
              classes={{
                root: classes.shareRoot,
                title: classes.shareTitle,
                social: classes.shareSocial,
                url: classes.shareUrl,
                urlInput: classes.shareUrlInput,
                dropDownRoot: classes.shareDropDownRoot,
                dropDownPaper: classes.shareDropDownPaper
              }}
            >
              Share
            </ShareDropDown>
            <EmbedDropDown
              anchorEl={embedAnchorEl}
              onClose={() => setEmbedAnchorEl(null)}
              open={embedAnchorEl !== null}
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
          </>
        )}
        <Grid item>
          <Grid container direction="column" spacing={1}>
            <Grid item>
              <Typography dangerouslySetInnerHTML={{ __html: post.title }} />
            </Grid>
            <Grid item>
              <Typography
                component="div"
                dangerouslySetInnerHTML={{
                  __html: expand
                    ? post.content
                    : post.content.split('<p><!--more--></p>')[0]
                }}
              />
            </Grid>
          </Grid>
        </Grid>

        {!link && post.content.includes('<p><!--more--></p>') && (
          <Grid item>
            <CardButton
              onClick={() => {
                if (onExpand) {
                  onExpand(!expand);
                }
                setExpand(!expand);
              }}
            >
              {expand ? (
                <>
                  <MinimizeIcon />
                  Read Less
                </>
              ) : (
                <>
                  <AddIcon />
                  Read More
                </>
              )}
            </CardButton>
          </Grid>
        )}
      </>
    );
  };
  return (
    <Grid className={classes.root} container direction="column" spacing={2}>
      {/* eslint-disable-next-line no-nested-ternary */}
      {post ? (
        link ? (
          <Link href={link}>{renderPost()}</Link>
        ) : (
          renderPost()
        )
      ) : (
        <ContentLoader primaryOpacity={0.5} secondaryOpacity={1} height={250}>
          <rect x="0" y="0" width="97%" height="100%" />
        </ContentLoader>
      )}
    </Grid>
  );
}

Card.propTypes = {
  embed: propTypes.shape({
    title: propTypes.string.isRequired,
    subtitle: propTypes.string,
    code: propTypes.string
  }),
  fullWidth: propTypes.bool,
  onExpand: propTypes.func,
  link: propTypes.string,
  post: propTypes.shape({
    title: propTypes.string,
    /**
     * Content will be split at `<p><!--more--></p>` for read more.
     */
    content: propTypes.string
  }),
  width: propTypes.oneOfType([propTypes.number, propTypes.string]),
  share: propTypes.shape({
    email: propTypes.shape({
      subject: propTypes.string,
      body: propTypes.string,
      separator: propTypes.string
    }),
    facebook: propTypes.shape({
      url: propTypes.string,
      quote: propTypes.string,
      hashtag: propTypes.string
    }),
    shareIcon: propTypes.shape({
      round: propTypes.bool,
      size: propTypes.number
    }),
    twitter: propTypes.shape({
      url: propTypes.string,
      title: propTypes.string,
      hashtags: propTypes.string
    })
  })
};

Card.defaultProps = {
  embed: {
    title: 'Embed code for this card',
    subtitle: 'Copy the code below, then paste into your own CMS or HTML.',
    code: `
    <iframe title="" src="" />
    <script src="https://dashboard.takwimu.africa/wp-content/themes/hurumap/assets/js/hurumap-iframe-handler.js" />`
  },
  fullWidth: false,
  onExpand: undefined,
  link: undefined,
  post: undefined,
  width: undefined,
  share: {
    facebook: {},
    twitter: {}
  }
};

export default Card;
