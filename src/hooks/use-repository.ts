import { useQuery } from '@tanstack/react-query';
import { api } from '../lib/api';

export interface GithubRepository {
  id: number;
  name: string;
  full_name: string;
  owner: {
    login: string;
    avatar_url: string;
  };
  html_url: string;
  description: string;
  stargazers_count: number;
  language: string;
}

export function useRepository(username: string | undefined, repoName: string | undefined) {
  return useQuery({
    queryKey: ['repository', username, repoName],
    queryFn: async () => {
      const response = await api.get<GithubRepository>(`/repos/${username}/${repoName}`);
      return response.data;
    },
    enabled: !!username && !!repoName,
    retry: false,
  });
}
