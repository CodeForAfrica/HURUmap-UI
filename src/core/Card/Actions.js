import React from 'react';
import Grid from '@material-ui/core/Grid';
import ButtonBase from '@material-ui/core/ButtonBase';
import ShareIcon from '@material-ui/icons/Share';
import EmbedIcon from '@material-ui/icons/Code';
import propTypes from '../propTypes';

function CardActions({ onShare, onEmbed }) {
  return (
    <Grid
      style={{
        right: 20,
        color: 'white',
        backgroundColor: 'black',
        padding: '2px 5px',
        borderRadius: 5
      }}
      container
      spacing={1}
    >
      <Grid item>
        <ButtonBase onClick={onEmbed}>
          <EmbedIcon style={{ fontSize: 15 }} />
        </ButtonBase>
      </Grid>
      <Grid item>
        <ButtonBase onClick={onShare}>
          <ShareIcon style={{ fontSize: 15 }} />
        </ButtonBase>
      </Grid>
    </Grid>
  );
}

CardActions.propTypes = {
  onShare: propTypes.func,
  onEmbed: propTypes.func
};

CardActions.defaultProps = {
  onShare: undefined,
  onEmbed: undefined
};

export default CardActions;
