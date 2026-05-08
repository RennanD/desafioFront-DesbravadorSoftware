import { Button, Stack } from 'react-bootstrap';
import { ChevronLeft, ChevronRight, ChevronsLeft, ChevronsRight } from 'lucide-react';

interface RepoPaginationProps {
  currentPage: number;
  totalPages: number;
  onPageChange: (page: number) => void;
  isLoading?: boolean;
}

export function RepoPagination({ 
  currentPage, 
  totalPages, 
  onPageChange,
  isLoading 
}: RepoPaginationProps) {
  if (totalPages <= 1) return null;

  const isFirstPage = currentPage === 1;
  const isLastPage = currentPage === totalPages;

  const buttonStyle = (disabled: boolean) => ({
    opacity: disabled ? 0.5 : 1,
    cursor: disabled ? 'not-allowed' : 'pointer',
    display: 'flex',
    alignItems: 'center',
    gap: '4px'
  });

  return (
    <Stack direction="horizontal" gap={2} className="justify-content-center mt-4 mb-5">
      <Button 
        variant="outline-primary" 
        size="sm"
        onClick={() => onPageChange(1)}
        disabled={isFirstPage || isLoading}
        style={buttonStyle(isFirstPage || isLoading)}
      >
        <ChevronsLeft size={16} />
      </Button>

      <Button 
        variant="outline-primary" 
        size="sm"
        onClick={() => onPageChange(currentPage - 1)}
        disabled={isFirstPage || isLoading}
        style={buttonStyle(isFirstPage || isLoading)}
      >
        <ChevronLeft size={16} />
      </Button>

      <span className="mx-3 fw-semibold text-secondary">
        Página {currentPage} de {totalPages}
      </span>

      <Button 
        variant="outline-primary" 
        size="sm"
        onClick={() => onPageChange(currentPage + 1)}
        disabled={isLastPage || isLoading}
        style={buttonStyle(isLastPage || isLoading)}
      >
        <ChevronRight size={16} />
      </Button>

      <Button 
        variant="outline-primary" 
        size="sm"
        onClick={() => onPageChange(totalPages)}
        disabled={isLastPage || isLoading}
        style={buttonStyle(isLastPage || isLoading)}
      >
        <ChevronsRight size={16} />
      </Button>
    </Stack>
  );
}
