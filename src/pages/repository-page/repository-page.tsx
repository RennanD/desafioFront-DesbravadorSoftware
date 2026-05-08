import { Container, Card, Button } from 'react-bootstrap';
import { Star, ExternalLink, FileText } from 'lucide-react';
import { useParams } from 'react-router';
import ReactMarkdown from 'react-markdown';
import { User, UserAvatar, UserName } from '../../components/user';

export function RepositoryPage() {
  const { user, repository } = useParams();

  // Dados estáticos para demonstração (conforme padrão do projeto)
  const repoData = {
    name: repository || 'awesome-project',
    description: 'A curated list of awesome things for developers to build amazing apps. This project is a collection of resources, libraries, and tools that help in day-to-day development.',
    stars: '4.2k',
    language: 'JavaScript',
    externalUrl: 'https://github.com',
    user: {
      name: user || 'Barbara Machado',
      avatarUrl: 'https://avatars.githubusercontent.com/u/74681655?v=4',
    },
    // Simulação de README (pode ser null para testar o empty state)
    readme: `# awesome-project\n\nThis is a sample README content for the **${repository}** repository.\n\n## Features\n- Modern UI with React\n- Responsive Design\n- GitHub API Integration\n\n## Getting Started\n1. Clone the repo\n2. Run \`npm install\`\n3. Run \`npm run dev\``
  };

  return (
    <main className="bg-light" style={{ minHeight: 'calc(100vh - 64px)' }}>
      <Container className="py-5" style={{ maxWidth: '960px' }}>
        {/* Breadcrumb Context */}
        <div className="d-flex align-items-center gap-2 mb-4">
          <User align="center" gap={2}>
            <UserAvatar 
              src={repoData.user.avatarUrl} 
              alt={repoData.user.name} 
              size={32} 
            />
            <UserName 
              text={repoData.user.name} 
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
              {repoData.description}
            </p>
            
            <div className="d-flex flex-wrap align-items-center justify-content-between gap-3">
              <div className="d-flex align-items-center gap-4">
                <div className="d-flex align-items-center gap-1 text-secondary">
                  <Star size={18} />
                  <span><strong>{repoData.stars}</strong> stars</span>
                </div>
                <div className="d-flex align-items-center gap-2">
                  <span 
                    className="rounded-circle" 
                    style={{ width: '12px', height: '12px', backgroundColor: '#f1e05a' }} 
                  />
                  <span className="text-secondary">{repoData.language}</span>
                </div>
              </div>

              <Button 
                variant="outline-primary" 
                href={repoData.externalUrl} 
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
            {repoData.readme ? (
              <div className="markdown-body">
                <ReactMarkdown>{repoData.readme}</ReactMarkdown>
              </div>
            ) : (
              <div className="text-center py-5 bg-light rounded border border-dashed">
                <FileText size={48} className="text-secondary opacity-25 mb-3" />
                <p className="text-secondary mb-0">
                  README não encontrado para este repositório
                </p>
              </div>
            )}
          </Card.Body>
        </Card>
      </Container>
    </main>
  );
}
