import { Container } from 'react-bootstrap';
import { useParams } from 'react-router';
import { useRepository } from '../../hooks/use-repository';
import { useReadme } from '../../hooks/use-readme';
import { ErrorMessage } from '../../components/error-message/error-message';
import { RepositoryInfo } from './repository-info';
import { RepositoryReadme } from './repository-readme';
import { RepositoryInfoSkeleton, ReadmeSkeleton } from './repository-skeletons';
import axios from 'axios';

export function RepositoryPage() {
  const { user, repository } = useParams();

  const { 
    data: repoData, 
    isLoading: isLoadingRepo, 
    isError: isErrorRepo, 
    error: repoError 
  } = useRepository(user, repository);

  const { 
    data: readmeData, 
    isLoading: isLoadingReadme, 
    isError: isErrorReadme, 
    error: readmeError 
  } = useReadme(user, repository);

  // 1. Erro de Repositório (404 ou outros)
  if (isErrorRepo) {
    const is404 = axios.isAxiosError(repoError) && repoError.response?.status === 404;
    return (
      <ErrorMessage 
        message={is404 ? 'Repositório não encontrado.' : 'Ocorreu um erro ao carregar o repositório.'} 
      />
    );
  }

  return (
    <main className="bg-light" style={{ minHeight: 'calc(100vh - 64px)' }}>
      <Container className="py-5" style={{ maxWidth: '960px' }}>
        {/* Info Area */}
        {isLoadingRepo || !repoData ? (
          <RepositoryInfoSkeleton />
        ) : (
          <RepositoryInfo repoData={repoData} username={user} />
        )}

        {/* README Area */}
        {isLoadingRepo ? (
          <ReadmeSkeleton />
        ) : (
          <RepositoryReadme 
            isLoading={isLoadingReadme}
            isError={isErrorReadme}
            error={readmeError}
            content={readmeData?.decodedContent}
          />
        )}
      </Container>
    </main>
  );
}
