import { useQuery } from '@tanstack/react-query';
import { api } from '../lib/api';

interface GithubUser {
  login: string;
  avatar_url: string;
  name: string;
  bio: string;
  followers: number;
  following: number;
  email: string | null;
}

export function useUserDetail(username: string | undefined) {
  return useQuery({
    queryKey: ['user', username],
    queryFn: async () => {
      const response = await api.get<GithubUser>(`/users/${username}`);
      return response.data;
    },
    enabled: !!username,
  });
}
