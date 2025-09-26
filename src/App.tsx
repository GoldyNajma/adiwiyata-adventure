import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { UserProvider } from './context/UserContext';
import Welcome from './pages/Welcome';
import Registration from './pages/Registration';
import GameStage from './pages/GameStage';
import Leaderboard from './pages/Leaderboard';
import ProtectedRoute from './components/ProtectedRoute';
export function App() {
  return <UserProvider>
      <BrowserRouter>
        <div className="bg-top bg-gradient-to-b from-green-50 to-green-100 min-h-screen w-full">
          <Routes>
            <Route path="/" element={<Welcome />} />
            <Route path="/register" element={<Registration />} />
            <Route path="/stage/:stageId" element={<ProtectedRoute>
                  <GameStage />
                </ProtectedRoute>} />
            <Route path="/leaderboard" element={
                // <ProtectedRoute>
                  <Leaderboard />
                // </ProtectedRoute>
              } />
            <Route path="*" element={<Navigate to="/" replace />} />
          </Routes>
        </div>
      </BrowserRouter>
    </UserProvider>;
}