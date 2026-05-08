import { Card, Table, Button, Badge, Container, Row, Col } from 'react-bootstrap';
import { Star, ArrowUpDown } from 'lucide-react';
import { UserInfo } from '../../components/user';
import { Link, useParams } from 'react-router';

export function UserPage() {
  const { user } = useParams();

  return (
    <main className="bg-light" style={{ minHeight: 'calc(100vh - 64px)' }}>
      <Container className="py-5">
        <Row className="gap-4 gap-md-0">
          {/* Sidebar: User Info */}
          <Col md={4} lg={3}>
            <UserInfo
              avatarUrl="https://avatars.githubusercontent.com/u/74681655?v=4"
              name="Barbara Machado"
              bio="Frontend Developer | Tech Enthusiast | Open Source Contributor"
              email="barbara@example.com"
              followers={1200}
              following={850}
            />
          </Col>

          {/* Main Content: Repos Table */}
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
                    <tr>
                      <td className="py-3">
                        <Link 
                          to={`/${user}/awesome-project`} 
                          className="fw-semibold text-primary text-decoration-none"
                        >
                          awesome-project
                        </Link>
                        <p className="text-secondary mb-0 small">A curated list of awesome things for developers to build amazing apps.</p>
                      </td>
                      <td className="py-3 align-middle">
                        <div className="d-flex align-items-center gap-1">
                          <Star size={14} className="text-secondary" />
                          <span>4.2k</span>
                        </div>
                      </td>
                      <td className="py-3 align-middle">
                        <Badge bg="warning" text="dark">JavaScript</Badge>
                      </td>
                    </tr>
                    <tr>
                      <td className="py-3">
                        <Link 
                          to={`/${user}/react-hooks-library`} 
                          className="fw-semibold text-primary text-decoration-none"
                        >
                          react-hooks-library
                        </Link>
                        <p className="text-secondary mb-0 small">Collection of useful React hooks for every day development.</p>
                      </td>
                      <td className="py-3 align-middle">
                        <div className="d-flex align-items-center gap-1">
                          <Star size={14} className="text-secondary" />
                          <span>1.8k</span>
                        </div>
                      </td>
                      <td className="py-3 align-middle">
                        <Badge bg="primary">TypeScript</Badge>
                      </td>
                    </tr>
                  </tbody>
                </Table>
              </Card.Body>
            </Card>
          </Col>
        </Row>
      </Container>
    </main>
  );
}
