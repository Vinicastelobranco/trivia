import React from 'react';
import { screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import renderWithRouterAndRedux from './helpers/renderWithRouterAndRedux';
import App from '../App';
import LocalStorageMock from './helpers/LocalStorageMock';
import { mockedReqToken, mockedReqQuestions } from './helpers/mockedFunctions';

describe('Testes da página de login', () => {
  global.localStorage = new LocalStorageMock;
  let myHistory = '';

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

    await waitFor(() => expect(mockedReqToken).toHaveBeenCalled());

    await waitFor(() => expect(mockedReqQuestions).toHaveBeenCalled());

    expect(myHistory.location.pathname).toBe('/jogo');

    myHistory.push('/');
    
    const settingsBtn = screen.getByTestId('btn-settings');
    userEvent.click(settingsBtn);

    expect(screen.getByTestId('settings-title')).toBeInTheDocument();
  });
});