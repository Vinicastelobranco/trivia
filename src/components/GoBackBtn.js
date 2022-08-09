import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

class GoBackBtn extends Component {
  constructor() {
    super();
    this.redirectToSettings = this.goBack.bind(this);
  }

  goBack(history) {
    history.goBack();
  }

  render() {
    const { history } = this.props;
    return (
      <button
        type="button"
        onClick={ () => this.goBack(history) }
      >
        Voltar
      </button>
    );
  }
}

GoBackBtn.propTypes = {
  history: PropTypes.objectOf(PropTypes.any).isRequired,
};

export default connect(null, null)(GoBackBtn);
