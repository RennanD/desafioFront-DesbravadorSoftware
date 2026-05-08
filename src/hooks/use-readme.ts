import { useQuery } from '@tanstack/react-query';
import { api } from '../lib/api';

export interface GithubReadme {
  content: string;
  encoding: string;
}

export function useReadme(username: string | undefined, repoName: string | undefined) {
  return useQuery({
    queryKey: ['readme', username, repoName],
    queryFn: async () => {
      const response = await api.get<GithubReadme>(`/repos/${username}/${repoName}/readme`);
      
      const { content } = response.data;
      
      // Decodificação segura de Base64 para UTF-8
      const decodedContent = decodeURIComponent(
        atob(content.replace(/\n/g, ''))
          .split('')
          .map(c => '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2))
          .join('')
      );
      
      return {
        ...response.data,
        decodedContent,
      };
    },
    enabled: !!username && !!repoName,
    retry: false,
  });
}
