import { useQuery } from '@tanstack/react-query';
import { api } from '../lib/api';

interface GithubRepo {
  id: number;
  name: string;
  description: string;
  stargazers_count: number;
  language: string;
}

interface SearchResponse {
  total_count: number;
  items: GithubRepo[];
}

export function useUserRepositories(
  username: string | undefined, 
  page: number = 1, 
  order: string = 'desc'
) {
  return useQuery({
    queryKey: ['repos', username, page, order],
    queryFn: async () => {
      const response = await api.get<SearchResponse>(
        `/search/repositories?q=user:${username}&sort=stars&order=${order}&per_page=10&page=${page}`
      );
      return response.data;
    },
    enabled: !!username,
  });
}
