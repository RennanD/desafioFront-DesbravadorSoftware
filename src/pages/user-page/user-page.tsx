import { Container, Row } from 'react-bootstrap';
import { useParams } from 'react-router';
import { useUserDetail } from '../../hooks/use-user-detail';
import { useUserRepositories } from '../../hooks/use-user-repositories';
import { UserSidebar } from './user-sidebar';
import { UserRepoList } from './user-repo-list';
import { SidebarSkeleton, TableSkeleton } from './user-skeletons';
import { ErrorMessage } from '../../components/error-message';

export function UserPage() {
  const { user } = useParams();

  const { 
    data: userData, 
    isLoading: isLoadingUser, 
    isError: isErrorUser,
    error: userError 
  } = useUserDetail(user);

  const { 
    data: repositories, 
    isLoading: isLoadingRepos, 
    isError: isErrorRepos 
  } = useUserRepositories(user);

  if (isErrorUser) {
    const message = (userError as any)?.response?.status === 404 
      ? 'Usuário não encontrado. Verifique o nome digitado e tente novamente.'
      : 'Ocorreu um erro ao buscar os dados do usuário. Tente novamente mais tarde.';
    
    return <ErrorMessage message={message} />;
  }

  return (
    <main className="bg-light" style={{ minHeight: 'calc(100vh - 64px)' }}>
      <Container className="py-5">
        <Row className="gap-4 gap-md-0">
          {/* Sidebar Area */}
          {isLoadingUser || !userData ? (
            <SidebarSkeleton />
          ) : (
            <UserSidebar userData={userData} />
          )}

          {/* Main Content Area */}
          {isLoadingRepos || !repositories ? (
            <TableSkeleton />
          ) : isErrorRepos ? (
            <ErrorMessage message="Não foi possível carregar os repositórios." />
          ) : (
            <UserRepoList repositories={repositories} username={user || ''} />
          )}
        </Row>
      </Container>
    </main>
  );
}
