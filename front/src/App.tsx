import './App.css';
import { AuthProvider } from './contexts/auth';
import AppRoutes from './routes';

function App() {
  return (
    <div className="App">
      <AuthProvider>
        <AppRoutes />
      </AuthProvider>
    </div>
  );
}

export default App;
