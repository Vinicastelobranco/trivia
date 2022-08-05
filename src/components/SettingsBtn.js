import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

class SettingsBtn extends Component {
  constructor() {
    super();
    this.redirectToSettings = this.redirectToSettings.bind(this);
  }

  redirectToSettings(history) {
    history.push('/settings');
  }

  render() {
    const { history } = this.props;
    return (
      <button
        type="button"
        data-testid="btn-settings"
        onClick={ () => this.redirectToSettings(history) }
      >
        Configurações
      </button>
    );
  }
}

SettingsBtn.propTypes = {
  history: PropTypes.objectOf(PropTypes.any).isRequired,
};

export default connect(null, null)(SettingsBtn);
