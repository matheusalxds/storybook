import React from 'react';
import classNames from 'classnames';
import PropTypes from 'prop-types';

import css from './Button.module.scss';

const Button = ({ primary, danger, children }) => {
  const classes = classNames({
    [css['c-btn']]: true,
    [css['c-btn--primary']]: primary,
    [css['c-btn--danger']]: danger,
  });
  return (
    <button className={classes}>
      {children}
    </button>
  );
};

Button.propTypes = {
  primary: PropTypes.bool,
  danger: PropTypes.bool,
  children: PropTypes.string.isRequired,
};
Button.defaultProps = {
  primary: false,
  danger: false,
};

export default Button;
