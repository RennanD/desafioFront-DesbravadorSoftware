import { Card, Table, Button, Badge, Col } from 'react-bootstrap';
import { Star, ArrowUpDown } from 'lucide-react';
import { Link } from 'react-router';

interface Repository {
  id: number;
  name: string;
  description: string;
  stargazers_count: number;
  language: string;
}

interface UserRepoListProps {
  repositories: Repository[];
  username: string;
}

export function UserRepoList({ repositories, username }: UserRepoListProps) {
  return (
    <Col md={8} lg={9}>
      <Card className="border-0 shadow-sm">
        <Card.Body className="p-4">
          <div className="d-flex justify-content-between align-items-center mb-4">
            <h3 className="text-dark fw-bold m-0" style={{ fontSize: '24px' }}>
              Repositórios
            </h3>
            <Button variant="outline-secondary" size="sm" className="d-flex align-items-center gap-2">
              <ArrowUpDown size={14} /> Ordenar por: Estrelas
            </Button>
          </div>

          <Table hover responsive className="mb-0" style={{ minWidth: '600px' }}>
            <thead>
              <tr>
                <th className="border-top-0">Repositório</th>
                <th className="border-top-0" style={{ width: '120px' }}>Estrelas</th>
                <th className="border-top-0" style={{ width: '120px' }}>Linguagem</th>
              </tr>
            </thead>
            <tbody>
              {repositories.length === 0 ? (
                <tr>
                  <td colSpan={3} className="text-center py-5 text-secondary">
                    Nenhum repositório encontrado.
                  </td>
                </tr>
              ) : (
                repositories.map((repo) => (
                  <tr key={repo.id}>
                    <td className="py-3">
                      <Link 
                        to={`/${username}/${repo.name}`} 
                        className="fw-semibold text-primary text-decoration-none"
                      >
                        {repo.name}
                      </Link>
                      <p className="text-secondary mb-0 small">
                        {repo.description || 'Sem descrição disponível.'}
                      </p>
                    </td>
                    <td className="py-3 align-middle">
                      <div className="d-flex align-items-center gap-1">
                        <Star size={14} className="text-secondary" />
                        <span>{repo.stargazers_count.toLocaleString()}</span>
                      </div>
                    </td>
                    <td className="py-3 align-middle">
                      {repo.language ? (
                        <Badge bg="primary">{repo.language}</Badge>
                      ) : (
                        <span className="text-secondary small">N/A</span>
                      )}
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </Table>
        </Card.Body>
      </Card>
    </Col>
  );
}
