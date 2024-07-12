import ReactDOM from 'react-dom/client';
import App from './App.jsx';
import './index.css';
import ContextProvider from './store/ContextProvider.jsx';
import { CssBaseline } from '@mui/material';

ReactDOM.createRoot(document.getElementById('root')).render(
  <ContextProvider>
    <CssBaseline />
    <App />
  </ContextProvider>
);
