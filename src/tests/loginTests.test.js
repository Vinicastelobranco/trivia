import React from 'react';
import { screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import renderWithRouterAndRedux from './helpers/renderWithRouterAndRedux';
import App from '../App';
import requestTokenObj from '../services/requestToken';
import requestQuestionsObj from '../services/requestQuestions';

describe('Testes da página de login', () => {
  let myHistory = '';

  jest.spyOn(requestTokenObj, 'requestToken').mockResolvedValue({
    response_code: 0,
    response_message: "Token Generated Successfully!",
    token: "1c85443d3cfe1fee0d1a7bcf66de700080c50e47d221961216e73df1964b8a2e",
  });
  
  jest.spyOn(requestQuestionsObj, 'requestQuestions').mockResolvedValue({
      response_code: 0,
      results:[
        {
          category: 'Entertainment: Video Games',
          type:'multiple',
          difficulty:'easy',
          question: 'What is the first weapon you acquire in Half-Life?',
          correct_answer:'A crowbar',
          incorrect_answers: [
              'A pistol',
              'The H.E.V suit',
              'Your fists'
          ],
        },
        {
          category: 'Entertainment: Video Games',
          type:'multiple',
          difficulty:'easy',
          question: 'What is the first weapon you acquire in Half-Life?',
          correct_answer:'A crowbar',
          incorrect_answers: [
              'A pistol',
              'The H.E.V suit',
              'Your fists'
          ],
        }
    ],
    },
  );

  beforeEach(() => {   
    const { history } = renderWithRouterAndRedux(<App />);
    myHistory = history;
  });

  test('Verifica se a url e os componentes estão corretos', () => {
    expect(myHistory.location.pathname).toBe('/');
    expect(screen.getByTestId('input-gravatar-email')).toBeInTheDocument();
    expect(screen.getByTestId('input-player-name')).toBeInTheDocument();
    expect(screen.getByTestId('btn-play')).toBeInTheDocument();
    expect(screen.getByTestId('btn-settings')).toBeInTheDocument();
  });

  test('Verifica se a página login tem o comportamento esperado', async () => {
    const emailInput = screen.getByTestId('input-gravatar-email');
    const nameInput = screen.getByTestId('input-player-name');
    const playBtn = screen.getByTestId('btn-play');

    expect(playBtn).toHaveAttribute('disabled');

    userEvent.type(emailInput, 'alguém@email.com');
    userEvent.type(nameInput, 'meu nome');
    
    expect(playBtn).not.toHaveAttribute('disabled');

    userEvent.click(playBtn);

    await waitFor(() => expect(requestTokenObj.requestToken).toHaveBeenCalled());

    await waitFor(() => expect(requestQuestionsObj.requestQuestions).toHaveBeenCalled());

    expect(myHistory.location.pathname).toBe('/jogo');

    myHistory.push('/');
    
    const settingsBtn = screen.getByTestId('btn-settings');
    userEvent.click(settingsBtn);

    expect(screen.getByTestId('settings-title')).toBeInTheDocument();
  });
});