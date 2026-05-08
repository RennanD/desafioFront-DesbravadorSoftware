import { render, screen } from '@testing-library/react';
import { describe, it, expect } from 'vitest';
import { UserSidebar } from './user-sidebar';

describe('UserSidebar', () => {
  const mockUserData = {
    avatar_url: 'https://github.com/test.png',
    name: 'Test User',
    login: 'testuser',
    bio: 'Test Bio',
    followers: 100,
    following: 50,
    email: 'test@example.com',
  };

  it('should render user profile information correctly', () => {
    render(<UserSidebar userData={mockUserData} />);

    expect(screen.getByText('Test User')).toBeInTheDocument();
    expect(screen.getByText('Test Bio')).toBeInTheDocument();
    expect(screen.getByText('100')).toBeInTheDocument();
    expect(screen.getByText('50')).toBeInTheDocument();
    expect(screen.getByText('test@example.com')).toBeInTheDocument();
    
    const avatar = screen.getByAltText('Test User');
    expect(avatar).toHaveAttribute('src', 'https://github.com/test.png');
  });

  it('should render login name if full name is missing', () => {
    const dataWithoutName = { ...mockUserData, name: '' };
    render(<UserSidebar userData={dataWithoutName} />);

    expect(screen.getByText('testuser')).toBeInTheDocument();
  });
});
