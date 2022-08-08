import React, { Component } from 'react';
import PropTypes from 'prop-types';

const THOUSAND = 1000;

class Timer extends Component {
  constructor() {
    super();

    this.state = {
      count: 30,
    };
  }

  componentDidMount() {
    this.setTimerForGame();
  }

  componentDidUpdate(prevProps, prevState) {
    if (prevState.count === 1) {
      prevProps.changeTimerDone(true);
      clearInterval(this.intervalID);
    }
  }

  componentWillUnmount() {
    clearInterval(this.intervalID);
  }

  setTimerForGame = () => {
    this.intervalID = setInterval(() => {
      this.setState((prevState) => ({
        count: prevState.count - 1,
      }));
    }, THOUSAND);
  }

  render() {
    const { count } = this.state;
    return <div>{ count }</div>;
  }
}

Timer.propTypes = {
  changeTimerDone: PropTypes.func.isRequired,
};

export default Timer;
