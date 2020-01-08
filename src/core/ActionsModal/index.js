import React, { useState } from 'react';
import PropTypes from 'prop-types';

import { makeStyles } from '@material-ui/core/styles';
import { Dialog, Tabs, Tab } from '@material-ui/core';
import DownloadPanel from './DownloadPanel';
import EmbedPanel from './EmbedPanel';
import SharePanel from './SharePanel';
import TabPanel, { a11yProps } from './TabPanel';

export const SHARE_TAB = 0;
export const EMBED_TAB = 1;
export const DOWNLOAD_TAB = 2;

const useStyles = makeStyles(() => ({
  root: {},
  tabs: {}
}));

function ActionsModel({
  download,
  embed: embedProp,
  open,
  onClose,
  tab,
  share,
  url,
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
        <Tab label="Share" {...a11yProps(SHARE_TAB)} />
        <Tab label="Embed" {...a11yProps(EMBED_TAB)} />
        <Tab label="Download" {...a11yProps(DOWNLOAD_TAB)} />
      </Tabs>
      <TabPanel value={value} index={EMBED_TAB}>
        <EmbedPanel {...embed}>{embedCode}</EmbedPanel>
      </TabPanel>
      <TabPanel value={value} index={SHARE_TAB}>
        <SharePanel {...share} />
      </TabPanel>
      <TabPanel value={value} index={DOWNLOAD_TAB}>
        <DownloadPanel {...download} />
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
    title: PropTypes.string
  }),
  tab: PropTypes.number,
  url: PropTypes.string
};

ActionsModel.defaultProps = {
  download: null,
  embed: null,
  share: null,
  tab: EMBED_TAB,
  url: null
};

export default ActionsModel;
