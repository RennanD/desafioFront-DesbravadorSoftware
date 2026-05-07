import { useParams } from 'react-router';

export function UserPage() {
  const { user } = useParams();
  
  return (
    <div className="page-wrapper">
      <div className="text-center">
        <h1>Perfil do usuário: {user}</h1>
        <p className="text-secondary">Página em construção</p>
      </div>
    </div>
  );
}
