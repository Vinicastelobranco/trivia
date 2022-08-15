import React from 'react';
import { findAllByText, screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import renderWithRouterAndRedux from './helpers/renderWithRouterAndRedux';
import App from '../App'
import LocalStorageMock from './helpers/LocalStorageMock';
import { mockedReqQuestions } from './helpers/mockedFunctions';
import { mockedQuestionError } from './helpers/mockedData';
import requestQuestionsObj from '../services/requestQuestions';

const initialState = {
  player: {
    name: 'heitor',
    assertions: 1,
    score: 100,
    gravatarEmail: 'heitor@oi.com',
  },
  game: {
    timer: 30,
  }
}

describe('Testa a página do Game', () => {
  global.localStorage = new LocalStorageMock;
  test('se o Header é renderizado com os valores do state global', async () => {
    renderWithRouterAndRedux(<App />, initialState, '/jogo');
    const player = await screen.findByTestId('header-player-name');
    const score = screen.getByTestId('header-score');
    const gravatar = screen.getByAltText('Imagem Gravatar');
    const timer = screen.getByText('30');
    expect(score).toHaveTextContent('100');
    expect(player).toHaveTextContent('heitor');
    expect(gravatar.src).toBe("https://www.gravatar.com/avatar/35333ad9ca23d7e8079417dbf36f93d1");
    expect(timer).toBeInTheDocument();

  });
  test('se as perguntas e respostas do jogo são renderizadas', async () => {
    renderWithRouterAndRedux(<App />, initialState, '/jogo');
    await waitFor(() => expect(mockedReqQuestions).toHaveBeenCalled());

    const category = screen.getByTestId('question-category');
    const text = screen.getByTestId('question-text');
    const wrong = screen.getByRole('button', { name: /starfish/i });
    const correct = screen.getByTestId('correct-answer');

    expect(category).toHaveTextContent('Entertainment: Television')
    expect(text).toHaveTextContent(/In the episode of SpongeBob SquarePants/i);
    expect(correct).toHaveTextContent('Pinhead');
    expect(wrong).toBeInTheDocument();
  });

  test('redireciona para a página de Feedback após terminar o jogo', async () => {
    renderWithRouterAndRedux(<App />, initialState, '/jogo');
    await waitFor(() => expect(mockedReqQuestions).toHaveBeenCalled());

    const correctFirst = screen.getByTestId('correct-answer');
    userEvent.click(correctFirst);
    expect(correctFirst).toHaveClass('correct')
    const nextButtonFirst = screen.getByRole('button', { name: /next/i });
    userEvent.click(nextButtonFirst);

    for (let index = 0; index < 3; index += 1){
      const incorrect = screen.getAllByTestId('wrong-answer-0')[0];
      userEvent.click(incorrect);
      expect(incorrect).toHaveClass('incorrect');
      const nextButton = screen.getByRole('button', { name: /next/i });
      userEvent.click(nextButton);
    }

    await new Promise((r) => setTimeout(r, 30000));
    
    const nextButton = await screen.findByRole('button', { name: /next/i });
    userEvent.click(nextButton);

    const ranking = await screen.findByRole('button', { name: 'Ranking' });
    expect(ranking).toBeInTheDocument();
  }, 35000);

  test('se token for inválido', async () => {
    jest.spyOn(requestQuestionsObj, 'requestQuestions').mockResolvedValue({
      ...mockedQuestionError
    });
    const { history } = renderWithRouterAndRedux(<App />, initialState, '/jogo');
    await waitFor(() => expect(mockedReqQuestions).toHaveBeenCalled());

    expect(history.location.pathname).toBe('/');
  });
});
