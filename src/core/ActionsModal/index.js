import React, { useState } from 'react';
import PropTypes from 'prop-types';

import { Dialog, Tabs, Tab } from '@material-ui/core';
import DownloadPanel from './DownloadPanel';
import EmbedPanel from './EmbedPanel';
import SharePanel from './SharePanel';
import TabPanel, { a11yProps } from './TabPanel';
import makeStyles from '../styles/makeStyles';

export const SHARE_TAB = 0;
export const EMBED_TAB = 1;
export const DOWNLOAD_TAB = 2;

const useStyles = makeStyles(() => ({
  root: {},
  tabs: {},
  downloadContent: {},
  downloadDownloadButton: {},
  downloadSubtitle: {},
  downloadTitle: {},
  embedCode: {},
  embedCodeContainer: {},
  embedContent: {},
  embedSubtitle: {},
  embedTitle: {},
  shareSocial: {},
  shareSocialIcon: {},
  shareTitle: {},
  shareUrl: {},
  shareUrlContainer: {}
}));

function ActionsModel({
  download,
  embed: embedProp,
  id,
  open,
  onClose,
  tab,
  share,
  ...props
}) {
  const classes = useStyles(props);
  const [value, setValue] = useState(tab);
  const { code: embedCode, ...embed } = embedProp || {};
  const handleChange = (event, newValue) => {
    setValue(newValue);
  };
  const handleClose = () => {
    onClose();
  };
  const handleEnter = () => {
    if (value !== tab) {
      setValue(tab);
    }
  };

  return (
    <Dialog
      {...props}
      onClose={handleClose}
      onEnter={handleEnter}
      open={open}
      className={classes.root}
    >
      <Tabs
        value={value}
        onChange={handleChange}
        aria-label="actions tabs"
        scrollButtons="auto"
        variant="scrollable"
        className={classes.tabs}
      >
        <Tab label="Share" {...a11yProps(SHARE_TAB, id)} />
        <Tab label="Embed" {...a11yProps(EMBED_TAB, id)} />
        <Tab label="Download" {...a11yProps(DOWNLOAD_TAB, id)} />
      </Tabs>
      <TabPanel id={id} value={value} index={EMBED_TAB}>
        <EmbedPanel
          {...embed}
          classes={{
            code: classes.embedCode,
            codeContainer: classes.embedCodeContainer,
            content: classes.embedContent,
            subtitle: classes.embedSubtitle,
            title: classes.embedTitle
          }}
        >
          {embedCode}
        </EmbedPanel>
      </TabPanel>
      <TabPanel id={id} value={value} index={SHARE_TAB}>
        <SharePanel
          {...share}
          classes={{
            social: classes.shareSocial,
            socialIcon: classes.shareSocialIcon,
            subtitle: classes.shareSubtitle,
            title: classes.shareTitle,
            url: classes.shareUrl,
            urlContainer: classes.shareUrlContainer
          }}
        />
      </TabPanel>
      <TabPanel id={id} value={value} index={DOWNLOAD_TAB}>
        <DownloadPanel
          {...download}
          classes={{
            content: classes.downloadContent,
            downloadButton: classes.downloadDownloadButton,
            subtitle: classes.downloadSubtitle,
            title: classes.downloadTitle
          }}
        />
      </TabPanel>
    </Dialog>
  );
}

ActionsModel.propTypes = {
  download: PropTypes.shape({
    onDownload: PropTypes.func.isRequired,
    subtitle: PropTypes.string,
    title: PropTypes.string
  }),
  embed: PropTypes.shape({
    code: PropTypes.string.isRequired,
    subtitle: PropTypes.string,
    title: PropTypes.string
  }),
  id: PropTypes.string,
  open: PropTypes.bool.isRequired,
  onClose: PropTypes.func.isRequired,
  share: PropTypes.shape({
    email: PropTypes.shape({
      subject: PropTypes.string,
      body: PropTypes.string,
      separator: PropTypes.string,
      url: PropTypes.string
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
    }),
    title: PropTypes.string,
    url: PropTypes.string
  }),
  tab: PropTypes.number
};

ActionsModel.defaultProps = {
  download: null,
  embed: null,
  id: '',
  share: null,
  tab: EMBED_TAB
};

export default ActionsModel;
