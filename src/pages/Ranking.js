import React from 'react';
import PropTypes from 'prop-types';
import md5 from 'crypto-js/md5';
import PlayAgainBtn from '../components/PlayAgainBtn';
import HeaderAipim from '../components/HeaderAipim';

class Ranking extends React.Component {
  constructor() {
    super();
    this.state = {
      playersInfo: [],
    };
  }

  componentDidMount() {
    const arrayOfPlayers = this.getRanking('ranking');
    this.setState({
      playersInfo: arrayOfPlayers,
    });
  }

  getRanking = (key) => JSON.parse(localStorage.getItem(key))

  render() {
    const { history } = this.props;
    const { playersInfo } = this.state;
    return (
      <>
        <HeaderAipim />
        <div>
          <h1 data-testid="ranking-title">Ranking</h1>
          {
            playersInfo.sort((a, b) => Number(b.score) - Number(a.score))
              .map((player, index) => (
                <div key={ `${player}${index}` }>
                  <img src={ `https://www.gravatar.com/avatar/${md5(player.gravatarEmail).toString()}` } alt="Imagem Gravatar" />
                  <p>
                    Player:
                    {' '}
                    <span data-testid={ `player-name-${index}` }>{player.name}</span>
                  </p>
                  <p>
                    Score:
                    {' '}
                    <span data-testid={ `player-score-${index}` }>{player.score}</span>
                  </p>
                </div>

              ))
          }
          <PlayAgainBtn history={ history } testid="btn-go-home" />
        </div>
      </>
    );
  }
}

Ranking.propTypes = {
  history: PropTypes.objectOf(PropTypes.any).isRequired,
};

export default Ranking;
