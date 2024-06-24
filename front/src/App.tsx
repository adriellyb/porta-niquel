import './App.css';
import { AuthProvider } from './contexts/auth';
import { PrimeReactProvider } from 'primereact/api';
import "primereact/resources/themes/lara-light-cyan/theme.css";
import "/node_modules/primeflex/primeflex.css";
import 'primeicons/primeicons.css';

import AppRoutes from './routes';

function App({ pageProps }:any) {
  return (
    <div>
      <AuthProvider>
        <PrimeReactProvider>
          <AppRoutes {...pageProps} />
        </PrimeReactProvider>
      </AuthProvider>
    </div>
  );
}

export default App;
