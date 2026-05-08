import { renderHook, waitFor } from '@testing-library/react';
import { describe, it, expect, vi, beforeEach } from 'vitest';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { useUserDetail } from './use-user-detail';
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

describe('useUserDetail', () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it('should fetch user details correctly', async () => {
    const mockUser = {
      login: 'testuser',
      name: 'Test User',
      bio: 'Test Bio',
    };
    (api.get as any).mockResolvedValue({ data: mockUser });

    const { result } = renderHook(() => useUserDetail('testuser'), {
      wrapper: createWrapper(),
    });

    await waitFor(() => expect(result.current.isSuccess).toBe(true));

    expect(api.get).toHaveBeenCalledWith('/users/testuser');
    expect(result.current.data?.name).toBe('Test User');
  });

  it('should not fetch if username is undefined', () => {
    renderHook(() => useUserDetail(undefined), {
      wrapper: createWrapper(),
    });

    expect(api.get).not.toHaveBeenCalled();
  });
});
