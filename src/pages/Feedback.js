import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import Header from '../components/Header';
import PlayAgainBtn from '../components/PlayAgainBtn';
import { resetPlayerAction } from '../redux/actions';

class Feedback extends React.Component {
  componentDidMount() {
    const { gravatarEmail, score, name } = this.props;
    const playerInfo = {
      name,
      score,
      gravatarEmail,
    };
    const ranking = JSON.parse(localStorage.getItem('ranking'));
    if (ranking === null) {
      localStorage.setItem('ranking', JSON.stringify([playerInfo]));
    } else {
      localStorage.setItem('ranking', JSON.stringify([...ranking, playerInfo]));
    }
  }

  componentWillUnmount() {
    const { resetInfo } = this.props;
    resetInfo();
  }

  render() {
    const { assertions, score, history } = this.props;
    const THREE = 3;
    return (
      <>
        <Header />
        <div>
          {assertions < THREE
            ? (<span data-testid="feedback-text">Could be better...</span>)
            : (<span data-testid="feedback-text">Well Done!</span>) }
          <span data-testid="feedback-total-question">{ assertions }</span>
          {' '}
          <span data-testid="feedback-total-score">{ score }</span>
          <button
            type="button"
            data-testid="btn-ranking"
            onClick={ () => {
              history.push('/ranking');
            } }
          >
            Ranking
          </button>
        </div>
        <PlayAgainBtn history={ history } testid="btn-play-again" />
      </>
    );
  }
}

Feedback.propTypes = {
  assertions: PropTypes.number.isRequired,
  score: PropTypes.number.isRequired,
  history: PropTypes.objectOf(PropTypes.any).isRequired,
  gravatarEmail: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
  resetInfo: PropTypes.func.isRequired,
};

const mapStateToProps = (state) => ({
  assertions: state.player.assertions,
  score: state.player.score,
  gravatarEmail: state.player.gravatarEmail,
  name: state.player.name,
});

const mapDispatchToProps = (dispatch) => ({
  resetInfo: () => dispatch(resetPlayerAction()),
});

export default connect(mapStateToProps, mapDispatchToProps)(Feedback);
