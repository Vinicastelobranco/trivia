import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import Header from '../components/Header';
import PlayAgainBtn from '../components/PlayAgainBtn';

class Feedback extends React.Component {
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
};

const mapStateToProps = (state) => ({
  assertions: state.player.assertions,
  score: state.player.score,
});

export default connect(mapStateToProps)(Feedback);
