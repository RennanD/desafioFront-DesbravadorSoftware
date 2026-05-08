import { Card, Spinner } from 'react-bootstrap';
import { FileText } from 'lucide-react';
import ReactMarkdown from 'react-markdown';
import axios from 'axios';
import { ErrorMessage } from '../../components/error-message/error-message';

interface RepositoryReadmeProps {
  isLoading: boolean;
  isError: boolean;
  error: unknown;
  content: string | undefined;
}

export function RepositoryReadme({ isLoading, isError, error, content }: RepositoryReadmeProps) {
  return (
    <Card className="border shadow-sm">
      <Card.Header className="bg-white border-bottom py-3 px-4">
        <div className="d-flex align-items-center gap-2 text-secondary">
          <FileText size={18} />
          <span className="fw-medium">README.md</span>
        </div>
      </Card.Header>
      <Card.Body className="p-4 p-md-5">
        {isLoading ? (
          <div className="text-center py-5">
            <Spinner animation="border" variant="primary" size="sm" />
          </div>
        ) : isError ? (
          <ErrorMessage 
            message={
              (axios.isAxiosError(error) && error.response?.status === 404)
                ? 'README não encontrado para este repositório.'
                : 'Erro ao carregar o README.'
            } 
          />
        ) : (
          <div className="markdown-body">
            <ReactMarkdown>{content || ''}</ReactMarkdown>
          </div>
        )}
      </Card.Body>
    </Card>
  );
}
