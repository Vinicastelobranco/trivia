import React from 'react';
import { screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import renderWithRouterAndRedux from './helpers/renderWithRouterAndRedux';
import { mockedReqCategories } from './helpers/mockedFunctions';
import App from '../App';

describe('Testes da página de Settings', () => {
  test('Verifica se os elementos são renderizados corretamentes', async () => {
    renderWithRouterAndRedux(<App />, undefined, '/settings');
    await waitFor(() => expect(mockedReqCategories).toHaveBeenCalled());
    expect(screen.getByRole('combobox', {
      name: /category:/i
    })).toBeInTheDocument();
    expect(screen.getByRole('combobox', {
      name: /difficulty:/i
    })).toBeInTheDocument();
    expect(screen.getByRole('combobox', {
      name: /type:/i
    })).toBeInTheDocument();
    expect(screen.getByRole('button', {
      name: /login/i
    })).toBeInTheDocument();
  });
  test('Verifica se a página tem o comportamento esperado', async () => {
    const { store, history } = renderWithRouterAndRedux(<App />, undefined, '/settings');
    await waitFor(() => expect(mockedReqCategories).toHaveBeenCalled());

    const categorieSel = screen.getByRole('combobox', { name: /category:/i });
    const difficultySel = screen.getByRole('combobox', { name: /difficulty:/i });
    const typeSel = screen.getByRole('combobox', { name: /type:/i });
    const confirmBtn = screen.getByRole('button', { name: /login/i });

    userEvent.selectOptions(categorieSel, 'Entertainment: Film');
    userEvent.selectOptions(difficultySel, 'hard');
    userEvent.selectOptions(typeSel, 'multiple');

    userEvent.click(confirmBtn);

    expect(history.location.pathname).toBe('/');

    expect(store.getState().game.difficulty).toBe('hard');
    expect(store.getState().game.questionType).toBe('multiple');
  });
})
