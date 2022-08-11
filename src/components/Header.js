import React from 'react';
import { connect } from 'react-redux';
import md5 from 'crypto-js/md5';
import PropTypes from 'prop-types';

class Header extends React.Component {
  render() {
    const { userName, userEmail, score } = this.props;
    const hash = md5(userEmail).toString();
    return (
      <header>
        <p>
          Player:
          {' '}
          <span data-testid="header-player-name">{userName}</span>
        </p>
        <p>
          Score:
          {' '}
          <span data-testid="header-score">{score}</span>
        </p>
        <img src={ `https://www.gravatar.com/avatar/${hash}` } alt="Imagem Gravatar" data-testid="header-profile-picture" />
      </header>
    );
  }
}

Header.propTypes = {
  userName: PropTypes.string.isRequired,
  userEmail: PropTypes.string.isRequired,
  score: PropTypes.number.isRequired,
};

const mapStateToProps = (state) => ({
  userName: state.player.name,
  userEmail: state.player.gravatarEmail,
  score: state.player.score,
});

export default connect(mapStateToProps)(Header);
