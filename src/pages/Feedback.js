import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

class Feedback extends React.Component {
//   constructor() {
//     super();
//     this.state = {}


  render() {
   const { assertions, score } = this.props;
   return(
    <div>
    {score < 3 ? (<span data-testid='feedback-text'>Could be better...</span>) 
    : (<span data-testid='feedback-text'>Well Done!</span>) }
    <span data-testid>{ assertions }</span>
    <span data-testid>{ score }</span>
    </div>
   )
  }
}

Feedback.propTypes = {
  assertions: PropTypes.number.isRequired,
  score: PropTypes.number.isRequired,
};

const mapStateToProps = (state) => ({
    assertions: state.player.score,
    score: state.player.score,
  });

export default connect(mapStateToProps)(Feedback);
