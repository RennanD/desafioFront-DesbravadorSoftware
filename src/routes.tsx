import { Routes, Route } from 'react-router';
import { SearchPage } from './pages/search-page';
import { UserPage } from './pages/user-page';
import { RepositoryPage } from './pages/repository-page';
import { Layout } from './components/layout/layout';

export function AppRoutes() {
  return (
    <Routes>
      <Route element={<Layout />}>
        <Route path="/" element={<SearchPage />} />
        <Route path="/:user" element={<UserPage />} />
        <Route path="/:user/:repository" element={<RepositoryPage />} />
      </Route>
    </Routes>
  );
}
