import React from 'react';
import PropTypes from 'prop-types';

class Question extends React.Component {
  fisherYatesShuffle = (arr) => { // achei aqui --> https://www.delftstack.com/pt/howto/javascript/shuffle-array-javascript/#:~:text=random()%20*%20(i%20%2B%201,utilizando%20a%20sintaxe%20Destructuring%20Assignment%20
    for (let i = arr.length - 1; i > 0; i -= 1) {
      const j = Math.floor(Math.random() * (i + 1)); // random index
      [arr[i], arr[j]] = [arr[j], arr[i]]; // swap
    }
  }

  otherAnswers = (elements) => {
    const {
      question:
      { correct_answer: correct },
    } = this.props;
    for (let index = 0; index < elements.length; index += 1) {
      if (elements[index].classList.length !== 0) {
        if (elements[index].innerText === correct) {
          elements[index].classList.add('correct');
        } else {
          elements[index].classList.add('incorrect');
        }
      }
    }
  }

  verifyAnswer = ({ target }) => {
    const {
      question:
      { correct_answer: correct },
    } = this.props;
    if (target.innerText === correct) {
      target.classList.add('correct');
    } else {
      target.classList.add('incorrect');
    }
    const buttons = document.querySelectorAll('.button');
    this.otherAnswers(buttons);
  }

  render() {
    const {
      question:
      { category, question, correct_answer: correct, incorrect_answers: incorrect },
    } = this.props;
    const array = [correct, ...incorrect];
    this.fisherYatesShuffle(array);
    return (
      <main>
        <p data-testid="question-category">{category}</p>
        <p data-testid="question-text">{question}</p>
        <div data-testid="answer-options">
          { array.map((answer) => {
            const MINUSONE = -1;
            let incorrectIndex = MINUSONE;
            if (answer !== correct) incorrectIndex += 1;
            return (
              <button
                key={ answer }
                type="button"
                data-testid={ answer === correct ? 'correct-answer'
                  : `wrong-answer-${incorrectIndex}` }
                className="button"
                onClick={ this.verifyAnswer }
              >
                {answer}
              </button>);
          }) }
        </div>
      </main>
    );
  }
}

Question.propTypes = {
  question: PropTypes.objectOf(PropTypes.any).isRequired,
};

export default Question;
