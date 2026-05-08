import { renderHook, waitFor } from '@testing-library/react';
import { describe, it, expect, vi, beforeEach } from 'vitest';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { useRepository } from './use-repository';
import { api } from '../lib/api';
import React from 'react';

vi.mock('../lib/api', () => ({
  api: {
    get: vi.fn(),
  },
}));

const createWrapper = () => {
  const queryClient = new QueryClient({
    defaultOptions: { queries: { retry: false } },
  });
  return ({ children }: { children: React.ReactNode }) => (
    <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>
  );
};

describe('useRepository', () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it('should fetch repository details correctly', async () => {
    const mockRepo = {
      id: 1,
      name: 'react',
      full_name: 'facebook/react',
      owner: { login: 'facebook', avatar_url: 'url' },
      stargazers_count: 100,
    };
    (api.get as any).mockResolvedValue({ data: mockRepo });

    const { result } = renderHook(() => useRepository('facebook', 'react'), {
      wrapper: createWrapper(),
    });

    await waitFor(() => expect(result.current.isSuccess).toBe(true));

    expect(api.get).toHaveBeenCalledWith('/repos/facebook/react');
    expect(result.current.data?.name).toBe('react');
  });

  it('should not fetch if parameters are missing', () => {
    renderHook(() => useRepository(undefined, 'react'), {
      wrapper: createWrapper(),
    });

    expect(api.get).not.toHaveBeenCalled();
  });
});
