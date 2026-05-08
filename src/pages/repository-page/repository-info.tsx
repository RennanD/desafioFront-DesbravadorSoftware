import { Card, Button } from 'react-bootstrap';
import { Star, ExternalLink } from 'lucide-react';
import { User, UserAvatar, UserName } from '../../components/user';
import type { GithubRepository } from '../../hooks/use-repository';

interface RepositoryInfoProps {
  repoData: GithubRepository;
  username: string | undefined;
}

export function RepositoryInfo({ repoData, username }: RepositoryInfoProps) {
  return (
    <>
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
            asLink={`/${username}`} 
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
    </>
  );
}
