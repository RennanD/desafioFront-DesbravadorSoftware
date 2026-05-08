import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import { describe, it, expect, vi } from 'vitest';
import { SearchPage } from './search-page';
import { BrowserRouter } from 'react-router';

const mockNavigate = vi.fn();

vi.mock('react-router', async () => {
  const actual = await vi.importActual('react-router');
  return {
    ...actual,
    useNavigate: () => mockNavigate,
  };
});

describe('SearchPage', () => {
  const renderComponent = () => render(
    <BrowserRouter>
      <SearchPage />
    </BrowserRouter>
  );

  it('should start with the search button disabled and correct styles', () => {
    renderComponent();
    const button = screen.getByRole('button', { name: /buscar usuário/i });
    expect(button).toBeDisabled();
    expect(button).toHaveStyle({ opacity: '0.6', cursor: 'not-allowed' });
  });

  it('should enable the button when input has text', () => {
    renderComponent();
    const input = screen.getByPlaceholderText(/digite o nome de usuário/i);
    const button = screen.getByRole('button', { name: /buscar usuário/i });

    fireEvent.change(input, { target: { value: 'rennand' } });
    expect(button).not.toBeDisabled();
  });

  it('should disable the button again if text is cleared', () => {
    renderComponent();
    const input = screen.getByPlaceholderText(/digite o nome de usuário/i);
    const button = screen.getByRole('button', { name: /buscar usuário/i });

    fireEvent.change(input, { target: { value: 'rennand' } });
    expect(button).not.toBeDisabled();

    fireEvent.change(input, { target: { value: '' } });
    expect(button).toBeDisabled();
  });

  it('should navigate to user page on valid submission', async () => {
    renderComponent();
    const input = screen.getByPlaceholderText(/digite o nome de usuário/i);
    const button = screen.getByRole('button', { name: /buscar usuário/i });

    fireEvent.change(input, { target: { value: 'rennand' } });
    fireEvent.click(button);

    await waitFor(() => {
      expect(mockNavigate).toHaveBeenCalledWith('/rennand');
    });
  });

  it('should show an alert if validation fails somehow (e.g. empty spaces bypassed)', async () => {
    renderComponent();
    const error = screen.queryByText(/digite um nome de usuário/i);
    expect(error).not.toBeInTheDocument();
  });
});
