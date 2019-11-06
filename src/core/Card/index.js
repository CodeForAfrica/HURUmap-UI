import React, { useState } from 'react';
import Box from '@material-ui/core/Box';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import AddIcon from '@material-ui/icons/Add';
import MinimizeIcon from '@material-ui/icons/Minimize';

import { makeStyles } from '@material-ui/styles';
import { Link } from '@material-ui/core';
import propTypes from '../propTypes';
import CardButton from './Button';
import ContentLoader from '../ContentLoader';
import CardActions from './Actions';

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

function Card({ fullWidth, link, post, width, onExpand }) {
  const [expand, setExpand] = useState(false);
  const classes = useStyles({ width: fullWidth ? '100%' : width, expand });

  const renderPost = () => {
    return (
      <>
        {!link && (
          <Box position="absolute" top={20} right={20}>
            <CardActions />
          </Box>
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

        {!link && (
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
  width: propTypes.oneOfType([propTypes.number, propTypes.string])
};

Card.defaultProps = {
  fullWidth: false,
  onExpand: undefined,
  link: undefined,
  post: undefined,
  width: undefined
};

export default Card;
