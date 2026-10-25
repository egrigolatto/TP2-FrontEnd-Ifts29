import { Navigate, Route, Routes } from 'react-router-dom'
import AppLayout from './components/AppLayout.jsx'
import ApiPage from './pages/ApiPage.jsx'
import BitacoraPage from './pages/BitacoraPage.jsx'
import ComponentTreePage from './pages/ComponentTreePage.jsx'
import HomePage from './pages/HomePage.jsx'
import ProfilePage from './pages/ProfilePage.jsx'
import ResourcesPage from './pages/ResourcesPage.jsx'

function App() {
  return (
    <Routes>
      <Route element={<AppLayout />}>
        <Route path="/" element={<HomePage />} />
        <Route path="/bitacora" element={<BitacoraPage />} />
        <Route path="/arbol" element={<ComponentTreePage />} />
        <Route path="/recursos" element={<ResourcesPage />} />
        <Route path="/api" element={<ApiPage />} />
        <Route path="/perfil/:memberId" element={<ProfilePage />} />
        <Route path="*" element={<Navigate to="/" replace />} />
      </Route>
    </Routes>
  )
}

export default App
