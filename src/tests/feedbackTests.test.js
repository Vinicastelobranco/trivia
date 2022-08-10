import React from 'react';
import { screen } from '@testing-library/react';
import App from '../App';
import userEvent from '@testing-library/user-event';
import renderWithRouterAndRedux from './helpers/renderWithRouterAndRedux';
import Feedback from '../pages/Feedback'

describe('Testes Feedback', () => {
  it('Verifica se as informações do jogador aparecem corretamente', () => {
    const initialState = {
      player: {
        name: 'Alguem',
        assertions: 3,
        score: 80,
        gravatarEmail: 'alguem@gmail.com',
      }
    }
    renderWithRouterAndRedux(<App />, initialState, '/feedback');
    expect(screen.getByText(/Alguem/i)).toBeDefined();
    expect(screen.getAllByText('80')[0]).toBeDefined();
    const image = screen.getByAltText('Imagem Gravatar');
    expect(image.src).toBe('https://www.gravatar.com/avatar/be13d0d8e32a05d50b956bed8f49a8b9');
  })

  it('Verifica se o botão de Ranking manda pro Ranking', () => {
    const initialState = {
      player: {
        name: 'Alguem',
        assertions: 3,
        score: 80,
        gravatarEmail: 'alguem@gmail.com',
      }
    }
    const { history } = renderWithRouterAndRedux(<App />, initialState, '/feedback' );

    const button = screen.getByRole('button', { name: /ranking/i })
    expect(button).toBeDefined();
    userEvent.click(button);

    expect(history.location.pathname).toBe('/ranking')
  })

  it('Verifica se é mostrado Could be better se você acertar menos que 3', () => {
    const initialState = {
      player: {
        name: 'Alguem',
        assertions: 2,
        score: 80,
        gravatarEmail: 'alguem@gmail.com',
      }
    }
    renderWithRouterAndRedux(<App />, initialState, '/feedback' );
    expect(screen.getByText(/Could be better/i)).toBeDefined();
  })

  it('Verifica se é mostrado Well Done se você acertar mais ou igual a 3', () => {
    const initialState = {
      player: {
        name: 'Alguem',
        assertions: 4,
        score: 80,
        gravatarEmail: 'alguem@gmail.com',
      }
    }
    renderWithRouterAndRedux(<App />, initialState, '/feedback' );
    expect(screen.getByText(/Well Done/i)).toBeDefined();
  })
  
})
