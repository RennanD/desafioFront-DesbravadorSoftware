import { render, screen, fireEvent } from '@testing-library/react';
import { describe, it, expect, vi } from 'vitest';
import { RepoPagination } from './repo-pagination';

describe('RepoPagination', () => {
  const onPageChangeMock = vi.fn();

  it('should render correct page information', () => {
    render(
      <RepoPagination 
        currentPage={2} 
        totalPages={5} 
        onPageChange={onPageChangeMock} 
      />
    );

    expect(screen.getByText('Página 2 de 5')).toBeInTheDocument();
  });

  it('should disable first and previous buttons on page 1', () => {
    render(
      <RepoPagination 
        currentPage={1} 
        totalPages={5} 
        onPageChange={onPageChangeMock} 
      />
    );

    const buttons = screen.getAllByRole('button');
    const firstBtn = buttons[0];
    const prevBtn = buttons[1];

    expect(firstBtn).toBeDisabled();
    expect(prevBtn).toBeDisabled();
    expect(firstBtn).toHaveStyle({ opacity: '0.5', cursor: 'not-allowed' });
  });

  it('should disable next and last buttons on last page', () => {
    render(
      <RepoPagination 
        currentPage={5} 
        totalPages={5} 
        onPageChange={onPageChangeMock} 
      />
    );

    const buttons = screen.getAllByRole('button');
    const nextBtn = buttons[2];
    const lastBtn = buttons[3];

    expect(nextBtn).toBeDisabled();
    expect(lastBtn).toBeDisabled();
  });

  it('should call onPageChange when buttons are clicked', () => {
    render(
      <RepoPagination 
        currentPage={2} 
        totalPages={5} 
        onPageChange={onPageChangeMock} 
      />
    );

    const buttons = screen.getAllByRole('button');
    
    // Click Next
    fireEvent.click(buttons[2]);
    expect(onPageChangeMock).toHaveBeenCalledWith(3);

    // Click Prev
    fireEvent.click(buttons[1]);
    expect(onPageChangeMock).toHaveBeenCalledWith(1);
  });
});
