import React from 'react';
import PropTypes from 'prop-types';
import Header from '../components/Header';
import requestQuestionsObj from '../services/requestQuestions';
import Question from '../components/Question';
import Timer from '../components/Timer';

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
    const token = localStorage.getItem('token');
    const questions = await requestQuestionsObj.requestQuestions(token);
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
      </>
    );
  }
}

Game.propTypes = {
  history: PropTypes.objectOf(PropTypes.any).isRequired,
};

export default Game;
