import { Card, Form, Button, InputGroup } from 'react-bootstrap';
import { Search } from 'lucide-react';
import { useNavigate } from 'react-router';

export function SearchPage() {
  const navigate = useNavigate();

  return (
    <div 
      className="d-flex align-items-center justify-content-center bg-light" 
      style={{ minHeight: 'calc(100vh - 64px)', padding: '1rem' }}
    >
      <Card 
        className="border-0 shadow-sm" 
        style={{ maxWidth: '600px', width: '100%', borderRadius: '8px' }}
      >
        <Card.Body className="d-flex flex-column" style={{ padding: '32px', gap: '24px' }}>
          <h1 
            className="text-center mb-0" 
            style={{ fontSize: '32px', fontWeight: 500, color: 'var(--bs-dark)' }}
          >
            GitHub Explorer
          </h1>
          <p 
            className="text-center mb-0" 
            style={{ fontSize: '16px', color: 'var(--bs-secondary)' }}
          >
            Busque por usuários e explore seus repositórios
          </p>
          
          <div className="d-flex flex-column" style={{ gap: '16px' }}>
            <InputGroup 
              className="input-group-focus-custom"
              style={{ height: '48px', borderRadius: '6px', border: '1px solid var(--bs-border-color)', overflow: 'hidden' }}
            >
              <InputGroup.Text className="bg-white pe-0 border-0">
                <Search size={20} color="var(--bs-secondary)" />
              </InputGroup.Text>
              <Form.Control
                className="ps-2 border-0 shadow-none bg-transparent"
                placeholder="Digite o nome de usuário..."
                style={{ fontSize: '16px', height: '100%' }}
              />
            </InputGroup>
            
            <Button 
              variant="primary" 
              className="w-100 d-flex align-items-center justify-content-center"
              style={{ fontWeight: 500, fontSize: '16px', height: '48px', borderRadius: '6px' }}
              onClick={() => navigate('/rennand')}
            >
              Buscar Usuário
            </Button>
          </div>
        </Card.Body>
      </Card>
    </div>
  );
}
