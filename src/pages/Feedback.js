import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import Header from '../components/Header';
import PlayAgainBtn from '../components/PlayAgainBtn';
import { resetPlayerAction } from '../redux/actions';
import '../styles/Feedback.css';

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
        <main className="feedback-body">
          <div className="feedback-div">
            <div className="feedback-statement">
              {assertions < THREE
                ? (
                  <p>
                    <span data-testid="feedback-text">Could be better...</span>
                    <span role="img" aria-label="emoji">&#128532;</span>
                  </p>
                )
                : (
                  <p>
                    <span data-testid="feedback-text">Well Done!</span>
                    <span role="img" aria-label="emoji">&#128512;</span>
                  </p>
                ) }
            </div>

            <p>
              Total of assertions:
              {' '}
              <span data-testid="feedback-total-question">{ assertions }</span>
            </p>

            <p>
              Total score:
              {' '}
              <span data-testid="feedback-total-score">{ score }</span>
            </p>

            <button
              className="feedback-btn"
              type="button"
              data-testid="btn-ranking"
              onClick={ () => {
                history.push('/ranking');
              } }
            >
              Ranking
            </button>
            <PlayAgainBtn history={ history } testid="btn-play-again" />
          </div>
        </main>
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
