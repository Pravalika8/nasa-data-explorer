import React, { useEffect, useState } from 'react';
import { LoaderContext } from './context';
export default function LoaderProvider({ children }) {
  const [loading, setLoading] = useState(false);
  const [loaderTitle, setLoaderTitle] = useState('');
  useEffect(() => {
    let timeout;
    if (loading) {
      timeout = setTimeout(() => {
        setLoading(false);
        setLoaderTitle('');
        console.warn('Loader auto-dismissed after 15s');
      }, 15000);
    }
    return () => clearTimeout(timeout);
  }, [loading]);
  return (
    <LoaderContext.Provider value={{ loading, setLoading, loaderTitle, setLoaderTitle }}>
      {children}
    </LoaderContext.Provider>
  );
}