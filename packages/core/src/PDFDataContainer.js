import React, { useState } from 'react';
import { PropTypes } from 'prop-types';

import { ButtonBase, Grid } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';

import { Document, Page, pdfjs } from 'react-pdf';
import LeftArrow from './assets/icons/left-arrow.svg';
import RightArrow from './assets/icons/right-arrow.svg';

pdfjs.GlobalWorkerOptions.workerSrc = `//cdnjs.cloudflare.com/ajax/libs/pdf.js/${pdfjs.version}/pdf.worker.js`;

const useStyles = makeStyles(theme => ({
  root: {
    width: '100%',
    padding: '0.625rem',
    overflow: 'hidden',
    [theme.breakpoints.up('md')]: {
      padding: '1.25rem'
    }
  },
  pageButton: {
    margin: '20px'
  }
}));

function DataContainer({ source, ...props }) {
  const classes = useStyles(props);
  const [page, setPage] = useState(1);
  const [numberOfPages, setNumberOfPages] = useState(0);

  if (!source) {
    return null;
  }
  return (
    <Grid
      container
      direction="row"
      alignItems="center"
      className={classes.root}
    >
      <Grid item>
        <ButtonBase
          disabled={page <= 1}
          className={classes.pageButton}
          onClick={() => setPage(page - 1)}
        >
          <LeftArrow />
        </ButtonBase>
      </Grid>
      <Grid item>
        <Document
          file={source}
          onLoadSuccess={({ numPages }) => setNumberOfPages(numPages)}
        >
          <Page pageNumber={page} />
        </Document>
      </Grid>
      <Grid item>
        <ButtonBase
          disabled={page >= numberOfPages}
          className={classes.pageButton}
          onClick={() => setPage(page + 1)}
        >
          <RightArrow />
        </ButtonBase>
      </Grid>
    </Grid>
  );
}

DataContainer.propTypes = {
  source: PropTypes.string.isRequired
};

export default DataContainer;
