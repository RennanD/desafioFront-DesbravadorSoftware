import { Card, Form, Button, InputGroup } from 'react-bootstrap';
import { Search } from 'lucide-react';

export function SearchPage() {
  return (
    <div className="page-wrapper">
      <Card className="search-card border-0 shadow-sm">
        <Card.Body className="p-0 d-flex flex-column" style={{ gap: '24px' }}>
          <h1 className="search-title text-center mb-0" style={{ fontSize: '32px', fontWeight: 500, color: 'var(--bs-dark)' }}>
            GitHub Explorer
          </h1>
          <p className="text-center mb-0" style={{ fontSize: '16px', color: 'var(--bs-secondary)' }}>
            Busque por usuários e explore seus repositórios
          </p>
          
          <div className="d-flex flex-column" style={{ gap: '16px' }}>
            <InputGroup className="custom-height input-group-focus-custom">
              <InputGroup.Text className="bg-white pe-0">
                <Search size={20} color="var(--bs-secondary)" />
              </InputGroup.Text>
              <Form.Control
                className="ps-2 custom-height"
                placeholder="Digite o nome de usuário ex.: rennnand..."
                style={{ fontSize: '16px' }}
              />
            </InputGroup>
            
            <Button 
              variant="primary" 
              className="custom-height w-100 d-flex align-items-center justify-content-center"
              style={{ fontWeight: 500, fontSize: '16px' }}
            >
              Buscar Usuário
            </Button>
          </div>
        </Card.Body>
      </Card>
    </div>
  );
}
