import { renderHook, waitFor } from '@testing-library/react';
import { describe, it, expect, vi, beforeEach } from 'vitest';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { useReadme } from './use-readme';
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

describe('useReadme', () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it('should fetch and decode readme correctly', async () => {
    const mockReadme = {
      content: btoa('Hello World'),
      encoding: 'base64',
    };
    (api.get as any).mockResolvedValue({ data: mockReadme });

    const { result } = renderHook(() => useReadme('facebook', 'react'), {
      wrapper: createWrapper(),
    });

    await waitFor(() => expect(result.current.isSuccess).toBe(true));

    expect(api.get).toHaveBeenCalledWith('/repos/facebook/react/readme');
    expect(result.current.data?.decodedContent).toBe('Hello World');
  });

  it('should handle UTF-8 characters correctly', async () => {
    // "Olá Mundo" em Base64
    const mockReadme = {
      content: 'T2zDoSBNdW5kbw==',
      encoding: 'base64',
    };
    (api.get as any).mockResolvedValue({ data: mockReadme });

    const { result } = renderHook(() => useReadme('facebook', 'react'), {
      wrapper: createWrapper(),
    });

    await waitFor(() => expect(result.current.isSuccess).toBe(true));
    expect(result.current.data?.decodedContent).toBe('Olá Mundo');
  });
});
