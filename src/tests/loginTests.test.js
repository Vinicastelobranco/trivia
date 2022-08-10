import React from 'react';
import { screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import renderWithRouterAndRedux from './helpers/renderWithRouterAndRedux';
import App from '../App';

describe('Testes da página de login', () => {
  let myHistory = '';

  beforeEach(() => {
    const { history } = renderWithRouterAndRedux(<App />);
    myHistory = history;

    global.fetch = jest.fn().mockResolvedValue({
      json: jest.fn().mockResolvedValue({
        response_code:0,
        response_message:'Token Generated Successfully!',
        token:'f00cb469ce38726ee00a7c6836761b0a4fb808181a125dcde6d50a9f3c9127b6',
      })},
    );
  });

  test('Verifica se a url e os componentes estão corretos', () => {
    expect(myHistory.location.pathname).toBe('/');
    expect(screen.getByTestId('input-gravatar-email')).toBeInTheDocument();
    expect(screen.getByTestId('input-player-name')).toBeInTheDocument();
    expect(screen.getByTestId('btn-play')).toBeInTheDocument();
    expect(screen.getByRole('button', { name: /configurações/i })).toBeInTheDocument();
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

    await waitFor(() => expect(fetch).toHaveBeenCalled());

    expect(myHistory.location.pathname).toBe('/jogo');

    myHistory.location.pathname = '/';
    
    const settingsBtn = screen.getByRole('button', { name: /configurações/i });
    userEvent.click(settingsBtn);

    expect(screen.getByTestId('settings-title')).toBeInTheDocument();
  });
});