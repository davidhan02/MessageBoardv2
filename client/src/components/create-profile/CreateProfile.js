import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

class CreateProfile extends Component {
  render() {
    return (
      <div>
        <h1>CreateProfile</h1>
      </div>
    );
  }
}

export default connect(null)(CreateProfile);
