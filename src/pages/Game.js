import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import Header from '../components/Header';
import requestQuestionsObj from '../services/requestQuestions';
import Question from '../components/Question';
import Timer from '../components/Timer';
import '../styles/Game.css';

class Game extends React.Component {
  constructor() {
    super();

    this.FOUR = 4;

    this.state = {
      questions: [],
      indexQuestion: 0,
      isTimerDone: false,
    };
  }

  async componentDidMount() {
    const { settingsInfo } = this.props;
    const token = localStorage.getItem('token');
    const questions = await requestQuestionsObj.requestQuestions(token, settingsInfo);
    const THREE = 3;
    if (questions.response_code === THREE) {
      const { history } = this.props;
      localStorage.removeItem('token');
      history.push('/');
    } else {
      this.setState({ questions: [...questions.results] });
    }
  }

  changeTimerDone = (bool) => {
    this.setState({
      isTimerDone: bool,
    });
  }

  nextQuestion = () => {
    const { questions: getQuestions } = this.state;
    this.setState((prevState) => ({
      questions: [],
      indexQuestion: prevState.indexQuestion + 1,
    }), () => {
      this.setState({
        questions: getQuestions,
        isTimerDone: false,
      });
    });
  }

  render() {
    const { questions, indexQuestion, isTimerDone } = this.state;
    const { history } = this.props;
    const question = questions[indexQuestion];
    return (
      <>
        <Header />
        <main className="questionContainer">
          { question === undefined ? <p>Loading...</p> : (
            <>
              <Timer
                changeTimerDone={ this.changeTimerDone }
                isTimerDone={ isTimerDone }
              />
              <Question
                question={ question }
                isTimerDone={ isTimerDone }
                changeTimerDone={ this.changeTimerDone }
              />
              { isTimerDone && (
                <button
                  type="button"
                  data-testid="btn-next"
                  className="nextButton"
                  onClick={ () => {
                    if (indexQuestion < this.FOUR) {
                      this.nextQuestion();
                    } else {
                      history.push('/feedback');
                    }
                  } }
                >
                  Next
                </button>) }
            </>
          )}
        </main>
      </>
    );
  }
}

Game.propTypes = {
  history: PropTypes.objectOf(PropTypes.any).isRequired,
  settingsInfo: PropTypes.objectOf(PropTypes.any).isRequired,
};

const mapStateToProps = (state) => ({
  settingsInfo: {
    category: state.game.category,
    difficulty: state.game.difficulty,
    type: state.game.questionType,
  },
});

export default connect(mapStateToProps)(Game);
