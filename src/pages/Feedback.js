import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

class Feedback extends React.Component {
//   constructor() {
//     super();
//     this.state = {}


  render() {
   const { score } = this.props;
   return(
    <div data-testid='feedback-text'>
    {score < 3 ? (<span>Could be better...</span>) 
    : (<span>Well Done!</span>) }
    </div>
   )
  }
}

Feedback.propTypes = {
  score: PropTypes.number.isRequired,
};

const mapStateToProps = (state) => ({
    score: state.player.score,
  });

export default connect(mapStateToProps)(Feedback);
