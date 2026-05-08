import { render, screen } from '@testing-library/react';
import { describe, it, expect, vi, beforeEach } from 'vitest';
import { RepositoryPage } from './repository-page';
import { useRepository } from '../../hooks/use-repository';
import { useReadme } from '../../hooks/use-readme';
import { MemoryRouter, useParams } from 'react-router';
import axios from 'axios';

// Mocks
vi.mock('../../hooks/use-repository');
vi.mock('../../hooks/use-readme');
vi.mock('react-router', async () => {
  const actual = await vi.importActual('react-router');
  return {
    ...actual,
    useParams: vi.fn(),
  };
});

describe('RepositoryPage', () => {
  beforeEach(() => {
    vi.clearAllMocks();
    (useParams as any).mockReturnValue({ user: 'RennanD', repository: 'ze-delivery-clone' });
  });

  it('should render loading state initially', () => {
    (useRepository as any).mockReturnValue({ isLoading: true });
    (useReadme as any).mockReturnValue({ isLoading: true });

    render(
      <MemoryRouter>
        <RepositoryPage />
      </MemoryRouter>
    );

    expect(screen.getByRole('status')).toBeInTheDocument();
  });

  it('should render error message if repository is not found', () => {
    (useRepository as any).mockReturnValue({ 
      isError: true, 
      error: { response: { status: 404 }, isAxiosError: true } 
    });
    
    // Mocking axios.isAxiosError to return true for this specific test
    vi.spyOn(axios, 'isAxiosError').mockReturnValue(true);

    render(
      <MemoryRouter>
        <RepositoryPage />
      </MemoryRouter>
    );

    expect(screen.getByText('Repositório não encontrado.')).toBeInTheDocument();
  });

  it('should render repository details and readme correctly', () => {
    const mockRepo = {
      name: 'ze-delivery-clone',
      description: 'Drink delivery app clone',
      stargazers_count: 14,
      language: 'TypeScript',
      owner: { login: 'RennanD', avatar_url: 'avatar-url' },
      html_url: 'github-url',
    };

    const mockReadme = {
      decodedContent: '# Decoded README content',
    };

    (useRepository as any).mockReturnValue({ data: mockRepo, isLoading: false });
    (useReadme as any).mockReturnValue({ data: mockReadme, isLoading: false });

    render(
      <MemoryRouter>
        <RepositoryPage />
      </MemoryRouter>
    );

    expect(screen.getByText('ze-delivery-clone')).toBeInTheDocument();
    expect(screen.getByText('Drink delivery app clone')).toBeInTheDocument();
    expect(screen.getByText('14')).toBeInTheDocument();
    expect(screen.getByText('Decoded README content')).toBeInTheDocument();
  });

  it('should render error message inside readme section if readme is not found', () => {
    const mockRepo = {
      name: 'ze-delivery-clone',
      owner: { login: 'RennanD', avatar_url: 'avatar-url' },
      stargazers_count: 14,
      language: 'TypeScript',
    };

    (useRepository as any).mockReturnValue({ data: mockRepo, isLoading: false });
    (useReadme as any).mockReturnValue({ 
      isError: true, 
      error: { response: { status: 404 }, isAxiosError: true },
      isLoading: false 
    });

    vi.spyOn(axios, 'isAxiosError').mockReturnValue(true);

    render(
      <MemoryRouter>
        <RepositoryPage />
      </MemoryRouter>
    );

    expect(screen.getByText('README não encontrado para este repositório.')).toBeInTheDocument();
  });
});
