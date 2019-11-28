import React from 'react';
import ButtonBase from '@material-ui/core/ButtonBase';
import propTypes from '../propTypes';

function CardButton({ children, ...props }) {
  return (
    <ButtonBase
      style={{
        color: 'white',
        backgroundColor: 'black',
        padding: '5px 10px',
        paddingLeft: '5px',
        borderRadius: 5
      }}
      {...props}
    >
      {children}
    </ButtonBase>
  );
}

CardButton.propTypes = {
  children: propTypes.children.isRequired
};

export default CardButton;
