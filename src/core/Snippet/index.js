import React, { useRef, useState, useMemo } from 'react';

import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import AddIcon from '@material-ui/icons/Add';
import MinimizeIcon from '@material-ui/icons/Remove';

import { makeStyles } from '@material-ui/core/styles';
import shortid from 'shortid';
import { Link } from '@material-ui/core';

import {
  domToPng,
  DOWNLOAD_HIDDEN_CLASSNAME,
  isDowloadHiddenElement
} from '../utils';
import propTypes from '../propTypes';
import ActionsModal, { EMBED_TAB, SHARE_TAB } from '../ActionsModal';
import SnippetButton from './Button';
import SnippetActions from './Actions';
import ContentLoader from '../ContentLoader';

const useStyles = makeStyles(theme => ({
  root: ({ expand, width }) => ({
    borderTop: `2px solid ${theme.palette.primary.main}`,
    position: 'relative',
    backgroundColor: 'whitesmoke',
    width: expand ? '100%' : width || 500,
    height: 'auto',
    padding: 20,
    '& img': {
      maxWidth: '100%',
      objectFit: 'cover'
    }
  }),
  cardButton: {}
}));

function Snippet({
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
  const cardRef = useRef(null);
  const id = idProp || shortid.generate();

  const [expand, setExpand] = useState(false);
  const classes = useStyles({
    width: fullWidth ? '100%' : width,
    expand,
    ...props
  });

  const [activeTab, setActiveTab] = useState(SHARE_TAB);
  const [modalOpen, setModalOpen] = useState(false);

  const defaultShareURL = useMemo(() => {
    const { origin, pathname, search, hash } = window ? window.location : {};
    const searchParams = new URLSearchParams(search);
    searchParams.append('indicatorId', id);
    const query = searchParams.toString();

    return `${origin}${pathname}${query ? `?${query}` : ''}${hash}`;
  }, [id]);

  const { onDownload: onDownloadProp } = download || {};
  const onDownload = () =>
    domToPng(cardRef.current, { filter: isDowloadHiddenElement }).then(
      onDownloadProp ||
        (dataUrl => {
          if (dataUrl) {
            const a = document.createElement('a');
            a.download = `${id}.png`;
            a.href = dataUrl;

            document.body.appendChild(a); // Firefox requires this
            a.click();
            document.body.removeChild(a);
          }
        })
    );

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
        <Grid item container direction="column" spacing={1}>
          <Grid item>
            <Grid
              container
              direction="row"
              wrap="nowrap"
              justify="space-between"
            >
              <Grid item>
                <Typography dangerouslySetInnerHTML={{ __html: post.title }} />
              </Grid>
              <Grid item className={DOWNLOAD_HIDDEN_CLASSNAME}>
                {!link && (
                  <>
                    <SnippetActions
                      onEmbed={e => showActionsModal(EMBED_TAB, e)}
                      onShare={e => showActionsModal(SHARE_TAB, e)}
                    />
                    <ActionsModal
                      id={id}
                      embed={embed}
                      open={modalOpen}
                      download={{ ...download, onDownload }}
                      onClose={handleActionsModalClose}
                      share={{ url: defaultShareURL, ...share }}
                      tab={activeTab}
                      classes={{
                        embedCode: classes.embedCode,
                        embedCodeContainer: classes.embedCodeContainer,
                        embedContent: classes.embedContent,
                        embedSubtitle: classes.embedSubtitle,
                        embedTitle: classes.embedTitle,
                        shareSocial: classes.shareSocial,
                        shareSocialIcon: classes.shareSocialIcon,
                        shareSubtitle: classes.shareSubtitle,
                        shareTitle: classes.shareTitle,
                        shareUrl: classes.shareUrl,
                        shareUrlContainer: classes.shareUrlContainer
                      }}
                    />
                  </>
                )}
              </Grid>
            </Grid>
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

        {!link && post.content.includes('<p><!--more--></p>') && (
          <Grid item className={DOWNLOAD_HIDDEN_CLASSNAME}>
            <SnippetButton
              onClick={() => {
                if (onExpand) {
                  onExpand(!expand);
                }
                setExpand(!expand);
              }}
              classes={{ root: classes.cardButton }}
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
            </SnippetButton>
          </Grid>
        )}
      </>
    );
  };
  return (
    <Grid
      container
      ref={cardRef}
      className={classes.root}
      direction="column"
      spacing={2}
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

Snippet.propTypes = {
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

Snippet.defaultProps = {
  download: {
    subtitle: 'For offline viewing or using it in print media.',
    title: 'Download this as an image'
  },
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
    twitter: {},
    url: undefined
  }
};

export default Snippet;
