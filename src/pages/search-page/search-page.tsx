import { Card, Form, Button, InputGroup } from 'react-bootstrap';
import { Search } from 'lucide-react';
import { useNavigate } from 'react-router';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';

const searchSchema = z.object({
  username: z.string().trim().min(1, 'Digite um nome de usuário para buscar'),
});

type SearchFormData = z.infer<typeof searchSchema>;

export function SearchPage() {
  const navigate = useNavigate();
  
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
    clearErrors,
  } = useForm<SearchFormData>({
    resolver: zodResolver(searchSchema),
    defaultValues: {
      username: '',
    }
  });

  const usernameValue = watch('username');
  const isButtonDisabled = !usernameValue || usernameValue.trim().length === 0;

  const onSubmit = (data: SearchFormData) => {
    navigate(`/${data.username}`);
  };

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
          
          <Form onSubmit={handleSubmit(onSubmit)} className="d-flex flex-column" style={{ gap: '16px' }}>
            <div>
              <InputGroup 
                className={`input-group-focus-custom ${errors.username ? 'is-invalid' : ''}`}
                style={{ height: '48px', borderRadius: '6px', border: '1px solid var(--bs-border-color)', overflow: 'hidden' }}
              >
                <InputGroup.Text className="bg-white pe-0 border-0">
                  <Search size={20} color="var(--bs-secondary)" />
                </InputGroup.Text>
                <Form.Control
                  {...register('username', { onChange: () => clearErrors('username') })}
                  className={`ps-2 border-0 shadow-none bg-transparent ${errors.username ? 'is-invalid' : ''}`}
                  placeholder="Digite o nome de usuário..."
                  style={{ fontSize: '16px', height: '100%' }}
                />
              </InputGroup>
              {errors.username && (
                <Form.Control.Feedback type="invalid" className="d-block mt-1">
                  {errors.username.message}
                </Form.Control.Feedback>
              )}
            </div>
            
            <Button 
              type="submit"
              variant="primary" 
              disabled={isButtonDisabled}
              className="w-100 d-flex align-items-center justify-content-center"
              style={{ 
                fontWeight: 500, 
                fontSize: '16px', 
                height: '48px', 
                borderRadius: '6px',
                opacity: isButtonDisabled ? 0.6 : 1,
                cursor: isButtonDisabled ? 'not-allowed' : 'pointer'
              }}
            >
              Buscar Usuário
            </Button>
          </Form>
        </Card.Body>
      </Card>
    </div>
  );
}
