import React, { Fragment } from 'react';
import PropTypes from 'prop-types';

const Header = ({ name }) => (
  <Fragment>
    <h2 className="h3">{name}</h2>
    <hr/>
  </Fragment>
);

Header.propTypes = {
  name: PropTypes.string.isRequired,
};

export default Header;
