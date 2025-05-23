import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';
import App from './App';
import './index.css';
import Header from './components/ui/Custom/Header';
import Footer from './components/ui/Custom/Footer';
import { Toaster } from 'sonner';

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <BrowserRouter>
      <Toaster />
      <Header/>
      <App />
      <Footer/>
    </BrowserRouter>
  </React.StrictMode>
);
