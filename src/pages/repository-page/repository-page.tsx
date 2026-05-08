import { Container, Card, Button, Spinner } from 'react-bootstrap';
import { Star, ExternalLink, FileText } from 'lucide-react';
import { useParams } from 'react-router';
import ReactMarkdown from 'react-markdown';
import { User, UserAvatar, UserName } from '../../components/user';
import { useRepository } from '../../hooks/use-repository';
import { useReadme } from '../../hooks/use-readme';
import { ErrorMessage } from '../../components/error-message/error-message';
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

  // 2. Loading Inicial do Repositório
  if (isLoadingRepo || !repoData) {
    return (
      <Container className="py-5 text-center">
        <Spinner animation="border" variant="primary" />
      </Container>
    );
  }

  return (
    <main className="bg-light" style={{ minHeight: 'calc(100vh - 64px)' }}>
      <Container className="py-5" style={{ maxWidth: '960px' }}>
        {/* Breadcrumb Context */}
        <div className="d-flex align-items-center gap-2 mb-4">
          <User align="center" gap={2}>
            <UserAvatar 
              src={repoData.owner.avatar_url} 
              alt={repoData.owner.login} 
              size={32} 
            />
            <UserName 
              text={repoData.owner.login} 
              size="small" 
              asLink={`/${user}`} 
            />
          </User>
          <span className="text-secondary">/</span>
          <span className="fw-bold text-dark">{repoData.name}</span>
        </div>

        {/* Info Card */}
        <Card className="border-0 shadow-sm mb-4">
          <Card.Body className="p-4">
            <p className="text-secondary mb-4" style={{ fontSize: '18px' }}>
              {repoData.description || 'Nenhuma descrição fornecida.'}
            </p>
            
            <div className="d-flex flex-wrap align-items-center justify-content-between gap-3">
              <div className="d-flex align-items-center gap-4">
                <div className="d-flex align-items-center gap-1 text-secondary">
                  <Star size={18} />
                  <span><strong>{repoData.stargazers_count}</strong> stars</span>
                </div>
                {repoData.language && (
                  <div className="d-flex align-items-center gap-2">
                    <span 
                      className="rounded-circle" 
                      style={{ width: '12px', height: '12px', backgroundColor: '#f1e05a' }} 
                    />
                    <span className="text-secondary">{repoData.language}</span>
                  </div>
                )}
              </div>

              <Button 
                variant="outline-primary" 
                href={repoData.html_url} 
                target="_blank"
                rel="noopener noreferrer"
                className="d-flex align-items-center gap-2"
              >
                <ExternalLink size={16} />
                Ver no GitHub
              </Button>
            </div>
          </Card.Body>
        </Card>

        {/* README Section */}
        <Card className="border shadow-sm">
          <Card.Header className="bg-white border-bottom py-3 px-4">
            <div className="d-flex align-items-center gap-2 text-secondary">
              <FileText size={18} />
              <span className="fw-medium">README.md</span>
            </div>
          </Card.Header>
          <Card.Body className="p-4 p-md-5">
            {isLoadingReadme ? (
              <div className="text-center py-5">
                <Spinner animation="border" variant="primary" size="sm" />
              </div>
            ) : isErrorReadme ? (
              <ErrorMessage 
                message={
                  (axios.isAxiosError(readmeError) && readmeError.response?.status === 404)
                    ? 'README não encontrado para este repositório.'
                    : 'Erro ao carregar o README.'
                } 
              />
            ) : (
              <div className="markdown-body">
                <ReactMarkdown>{readmeData?.decodedContent || ''}</ReactMarkdown>
              </div>
            )}
          </Card.Body>
        </Card>
      </Container>
    </main>
  );
}
