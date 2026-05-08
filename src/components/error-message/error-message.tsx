import { Alert, Container } from 'react-bootstrap';
import { AlertCircle } from 'lucide-react';

interface ErrorMessageProps {
  message: string;
}

export function ErrorMessage({ message }: ErrorMessageProps) {
  return (
    <Container className="py-5">
      <Alert variant="danger" className="d-flex align-items-center gap-3 py-4">
        <AlertCircle size={24} />
        <div>
          <Alert.Heading className="h5 mb-1 fw-bold">Ops! Algo deu errado</Alert.Heading>
          <p className="mb-0">{message}</p>
        </div>
      </Alert>
    </Container>
  );
}
