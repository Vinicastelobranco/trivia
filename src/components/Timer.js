import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { saveTimerAction } from '../redux/actions';

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
    const { isTimerDone } = this.props;
    const { count } = this.state;
    if (prevState.count === 1) {
      prevProps.changeTimerDone(true);
      clearInterval(this.intervalID);
    }
    if (isTimerDone) {
      clearInterval(this.intervalID);
      prevProps.saveTimer(count);
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
    const TEN = 10;
    return (
      <div className="timerContainer">
        <p className={ count <= TEN ? 'flashingRed' : 'timer' }>{ count }</p>
      </div>);
  }
}

Timer.propTypes = {
  changeTimerDone: PropTypes.func.isRequired,
  isTimerDone: PropTypes.bool.isRequired,
  saveTimer: PropTypes.func.isRequired,
};

const mapDispatchToProps = (dispatch) => ({
  saveTimer: (timer) => dispatch(saveTimerAction(timer)),
});

export default connect(null, mapDispatchToProps)(Timer);
