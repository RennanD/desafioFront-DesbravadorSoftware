import { Routes, Route } from 'react-router';
import { SearchPage } from './pages/search-page';
import { UserPage } from './pages/user-page';

export function AppRoutes() {
  return (
    <Routes>
      <Route path="/" element={<SearchPage />} />
      <Route path="/:user" element={<UserPage />} />
    </Routes>
  );
}
