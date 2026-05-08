import { useEffect } from 'react';
import { Container, Row } from 'react-bootstrap';
import { useParams, useSearchParams } from 'react-router';
import { useUserDetail } from '../../hooks/use-user-detail';
import { useUserRepositories } from '../../hooks/use-user-repositories';
import { UserSidebar } from './user-sidebar';
import { UserRepoList } from './user-repo-list';
import { SidebarSkeleton, TableSkeleton } from './user-skeletons';
import { ErrorMessage } from '../../components/error-message';
import { RepoPagination } from './repo-pagination';

export function UserPage() {
  const { user } = useParams();
  const [searchParams, setSearchParams] = useSearchParams();

  // Get state from URL or defaults
  const page = Number(searchParams.get('page')) || 1;
  const order = searchParams.get('order') || 'desc';

  const { 
    data: userData, 
    isLoading: isLoadingUser, 
    isError: isErrorUser,
    error: userError 
  } = useUserDetail(user);

  const { 
    data: repositoriesData, 
    isLoading: isLoadingRepos, 
    isError: isErrorRepos,
    isFetching: isFetchingRepos
  } = useUserRepositories(user, page, order);

  // Helper to update URL params
  const updateParams = (newParams: Record<string, string | number>) => {
    const params: Record<string, string> = {};
    searchParams.forEach((value, key) => {
      params[key] = value;
    });
    
    setSearchParams({ 
      ...params, 
      ...Object.fromEntries(
        Object.entries(newParams).map(([k, v]) => [k, String(v)])
      ) 
    });
  };

  const handlePageChange = (newPage: number) => {
    updateParams({ page: newPage });
  };

  const handleOrderChange = (newOrder: string) => {
    updateParams({ order: newOrder, page: 1 }); // Reset to page 1 on sort change
  };

  // Reset page when user changes
  useEffect(() => {
    if (searchParams.has('page') || searchParams.has('order')) {
      setSearchParams({});
    }
  }, [user]);

  if (isErrorUser) {
    const message = (userError as any)?.response?.status === 404 
      ? 'Usuário não encontrado. Verifique o nome digitado e tente novamente.'
      : 'Ocorreu um erro ao buscar os dados do usuário. Tente novamente mais tarde.';
    
    return <ErrorMessage message={message} />;
  }

  const totalPages = repositoriesData ? Math.ceil(repositoriesData.total_count / 10) : 0;

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
          <div className="col-md-8 col-lg-9">
            {isLoadingRepos || !repositoriesData ? (
              <TableSkeleton />
            ) : isErrorRepos ? (
              <ErrorMessage message="Não foi possível carregar os repositórios." />
            ) : (
              <>
                <UserRepoList 
                  repositories={repositoriesData.items} 
                  username={user || ''} 
                  currentOrder={order}
                  onOrderChange={handleOrderChange}
                />
                <RepoPagination 
                  currentPage={page}
                  totalPages={totalPages}
                  onPageChange={handlePageChange}
                  isLoading={isFetchingRepos}
                />
              </>
            )}
          </div>
        </Row>
      </Container>
    </main>
  );
}
