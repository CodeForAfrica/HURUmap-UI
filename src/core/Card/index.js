import React, { useEffect, useRef, useState } from 'react';
import Box from '@material-ui/core/Box';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import AddIcon from '@material-ui/icons/Add';
import MinimizeIcon from '@material-ui/icons/Remove';

import { makeStyles } from '@material-ui/core/styles';
import shortid from 'shortid';
import { Link } from '@material-ui/core';

import { domToPng } from '../utils';
import propTypes from '../propTypes';
import ActionsModal, { EMBED_TAB, SHARE_TAB } from '../ActionsModal';
import CardButton from './Button';
import CardActions from './Actions';
import ContentLoader from '../ContentLoader';
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
  download,
  fullWidth,
  id: idProp,
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
  const id = idProp || shortid.generate();
  const [embedAnchorEl, setEmbedAnchorEl] = useState(null);
  const [shareAnchorEl, setShareAnchorEl] = useState(null);
  const [activeTab, setActiveTab] = useState(SHARE_TAB);
  const [modalOpen, setModalOpen] = useState(false);
  const [url, setUrl] = useState();
  const cardRef = useRef(null);
  const downloadHiddenClassName = 'Download--hidden';
  const toPng = () => {
    const filter = node => {
      const { classList } = node;
      if (classList) {
        return !classList.contains(downloadHiddenClassName);
      }
      return true;
    };

    return domToPng(cardRef.current, { filter });
  };
  const defaultHandleDownload = dataUrl => {
    if (dataUrl) {
      const a = document.createElement('a');
      a.download = `${id}.png`;
      a.href = dataUrl;

      document.body.appendChild(a); // Firefox requires this
      a.click();
      document.body.removeChild(a);
    }
  };
  const { onDownload: onDownloadProp } = download || {};
  const handleDownload = onDownloadProp || defaultHandleDownload;
  const onDownload = () => toPng().then(handleDownload);
  useEffect(() => {
    const href = window && window.location.href.replace(/\/$/, '');
    const hash = id && id.length > 0 ? `/#{id}` : '';
    setUrl(`${href}${hash}`);
  }, [id, setUrl]);
  const showActionsModal = tab => {
    setActiveTab(tab);
    setModalOpen(true);
  };
  const handleActionsModalClose = () => {
    setModalOpen(false);
  };
  const renderPost = () => {
    return (
      <>
        {!link && (
          <>
            <Box
              position="absolute"
              top={20}
              right={20}
              className={downloadHiddenClassName}
            >
              <CardActions
                onEmbed={e => showActionsModal(EMBED_TAB, e)}
                onShare={e => showActionsModal(SHARE_TAB, e)}
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
            <ActionsModal
              download={{ ...download, onDownload }}
              embed={{ url, ...embed }}
              onClose={handleActionsModalClose}
              open={modalOpen}
              share={{ url, ...share }}
              tab={activeTab}
            />
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
          <Grid item className={downloadHiddenClassName}>
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
    <Grid
      className={classes.root}
      container
      direction="column"
      spacing={2}
      ref={cardRef}
    >
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
  download: propTypes.shape({
    onDownload: propTypes.func.isRequired,
    subtitle: propTypes.string,
    title: propTypes.string
  }),
  embed: propTypes.shape({
    title: propTypes.string.isRequired,
    subtitle: propTypes.string,
    code: propTypes.string
  }),
  fullWidth: propTypes.bool,
  id: propTypes.oneOfType([propTypes.number, propTypes.string]),
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
    }),
    url: propTypes.string
  })
};

Card.defaultProps = {
  download: undefined,
  embed: {
    title: 'Embed this by',
    subtitle:
      'Copying the code below and pasting it into your own CMS or HTML.',
    code: `<iframe title="" src="" />
<script src="https://dashboard.takwimu.africa/wp-content/themes/hurumap/assets/js/hurumap-iframe-handler.js" />`
  },
  fullWidth: false,
  id: undefined,
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
