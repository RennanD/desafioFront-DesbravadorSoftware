import { Link } from 'react-router';
import { GitBranch } from 'lucide-react';
import { Container } from 'react-bootstrap';

export function Header() {
  return (
    <header 
      className="border-bottom bg-white" 
      style={{ height: '64px' }}
    >
      <Container className="h-100 d-flex align-items-center">
        <Link 
          to="/" 
          className="d-flex align-items-center text-decoration-none gap-2"
        >
          <GitBranch size={24} className="text-dark" />
          <span className="text-dark fw-semibold" style={{ fontSize: '18px' }}>
            GitHub Explorer
          </span>
        </Link>
      </Container>
    </header>
  );
}
