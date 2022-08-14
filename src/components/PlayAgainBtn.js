import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

class PlayAgainBtn extends Component {
  constructor() {
    super();
    this.redirectToLogin = this.redirectToLogin.bind(this);
  }

  redirectToLogin(history) {
    history.push('/');
  }

  render() {
    const { history, testid } = this.props;
    return (
      <button
        className="feedback-btn"
        data-testid={ testid }
        type="button"
        onClick={ () => this.redirectToLogin(history) }
      >
        Play Again
      </button>
    );
  }
}

PlayAgainBtn.propTypes = {
  history: PropTypes.objectOf(PropTypes.any).isRequired,
  testid: PropTypes.string.isRequired,
};

export default connect(null, null)(PlayAgainBtn);
