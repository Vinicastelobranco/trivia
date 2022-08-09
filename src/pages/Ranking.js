import React from 'react';
import PropTypes from 'prop-types';
import PlayAgainBtn from '../components/PlayAgainBtn';

class Ranking extends React.Component {
//   componentDidMount() {
//     getRanking();
//   }

  /*   getRanking = (key) => {
    localStorage.getItem(key);
  } */

  render() {
    const { history } = this.props;
    return (
      <div>
        <h1 data-testid="ranking-title">Ranking</h1>
        <PlayAgainBtn history={ history } testid="btn-go-home" />
      </div>);
  }
}

Ranking.propTypes = {
  history: PropTypes.objectOf(PropTypes.any).isRequired,
};

export default Ranking;
