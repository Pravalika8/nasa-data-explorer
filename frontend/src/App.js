import './App.css';
import React from 'react';
import Header from './components/Header';
import Footer from './components/Footer';
import AppRoutes from './routes';
import LoaderProvider from './contexts/LoaderProvider';
import AlertProvider from './contexts/AlertProvider';

function App() {

  return (
    <React.Fragment>
      <div className="flex flex-col min-h-screen bg-gray-900 text-white" >
        <Header />
        <main className="flex-grow pt-20 px-4" >
          <AlertProvider >
            <LoaderProvider>
              <AppRoutes />
            </LoaderProvider>
          </AlertProvider>
        </main>
        <Footer />
      </div>
    </React.Fragment>
  );
}

export default App;
