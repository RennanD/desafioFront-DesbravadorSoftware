import { renderHook, waitFor } from '@testing-library/react';
import { describe, it, expect, vi, beforeEach } from 'vitest';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { useUserRepositories } from './use-user-repositories';
import { api } from '../lib/api';
import React from 'react';

// Mock do axios/api
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

describe('useUserRepositories', () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it('should fetch repositories with correct parameters', async () => {
    const mockData = { total_count: 1, items: [{ id: 1, name: 'repo-test' }] };
    (api.get as any).mockResolvedValue({ data: mockData });

    const { result } = renderHook(() => useUserRepositories('testuser', 2, 'asc'), {
      wrapper: createWrapper(),
    });

    await waitFor(() => expect(result.current.isSuccess).toBe(true));

    expect(api.get).toHaveBeenCalledWith(
      '/search/repositories?q=user:testuser&sort=stars&order=asc&per_page=10&page=2'
    );
    expect(result.current.data?.items[0].name).toBe('repo-test');
  });

  it('should not fetch if username is undefined', () => {
    renderHook(() => useUserRepositories(undefined), {
      wrapper: createWrapper(),
    });

    expect(api.get).not.toHaveBeenCalled();
  });
});
