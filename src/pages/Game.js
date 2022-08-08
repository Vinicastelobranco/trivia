import React from 'react';
import PropTypes from 'prop-types';
import Header from '../components/Header';
import requestQuestions from '../services/requestQuestions';
import Question from '../components/Question';

class Game extends React.Component {
  constructor() {
    super();
    this.state = {
      questions: [],
      indexQuestion: 0,
    };
  }

  async componentDidMount() {
    const token = localStorage.getItem('token');
    const questions = await requestQuestions(token);
    const THREE = 3;
    if (questions.response_code === THREE) {
      const { history } = this.props;
      localStorage.removeItem('token');
      history.push('/');
    } else {
      this.setState({ questions: [...questions.results] });
    }
  }

  render() {
    const { questions, indexQuestion } = this.state;
    const question = questions[indexQuestion];
    return (
      <>
        <Header />
        { question === undefined ? <p>Loading...</p> : <Question question={ question } />}
      </>
    );
  }
}

Game.propTypes = {
  history: PropTypes.objectOf(PropTypes.any).isRequired,
};

export default Game;
