import { useQuery } from '@tanstack/react-query';
import { api } from '../lib/api';

interface GithubRepo {
  id: number;
  name: string;
  description: string;
  stargazers_count: number;
  language: string;
}

export function useUserRepositories(username: string | undefined) {
  return useQuery({
    queryKey: ['repos', username],
    queryFn: async () => {
      const response = await api.get<GithubRepo[]>(`/users/${username}/repos?per_page=100`);
      return response.data;
    },
    enabled: !!username,
    select: (data) => {
      // Sorting by stars descending as per requirement
      return [...data].sort((a, b) => b.stargazers_count - a.stargazers_count);
    }
  });
}
