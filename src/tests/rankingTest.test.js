import React from 'react';
import { screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import renderWithRouterAndRedux from './helpers/renderWithRouterAndRedux';
import App from '../App';
import LocalStorageMock from './helpers/LocalStorageMock';

const players = [
  {
    name: "Henos",
    score: 291,
    gravatarEmail: "henosvinicius13@gmail.com",
  },
  {
    name: "chuck",
    score: 135,
    gravatarEmail: "ChuckNorris@Chuck.nor",
  },
];

describe('Testes da página de Ranking', () => {
  global.localStorage = new LocalStorageMock;
  localStorage.setItem('ranking', JSON.stringify(players));

  test('Verfica se os elementos são renderizados corretamente', () => {
    const { history } = renderWithRouterAndRedux(<App />, undefined, '/ranking');
    const title = screen.getByTestId('ranking-title');
    const image = screen.getAllByAltText('Imagem Gravatar');
    const playerOne = screen.getByTestId('player-name-0');
    const playerOneScore = screen.getByTestId('player-score-0');
    const playerTwo = screen.getByTestId('player-name-1');
    const playerTwoScore = screen.getByTestId('player-score-1');
    const playAgainBtn = screen.getByTestId('btn-go-home');

    expect(title).toHaveTextContent('Ranking');

    expect(playerOne).toHaveTextContent('Henos');
    expect(playerOneScore).toHaveTextContent('291');

    expect(playerTwo).toHaveTextContent('chuck');
    expect(playerTwoScore).toHaveTextContent('135');

    userEvent.click(playAgainBtn);
    expect(history.location.pathname).toBe('/');

  });
});
