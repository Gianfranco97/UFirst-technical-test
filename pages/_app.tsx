import { useEffect, useState } from 'react';
import type { AppProps } from 'next/app'
import { Router } from 'next/router';
import LoadingFullPage from 'components/LoadingFullPage';
import 'styles/globals.css'

function MyApp({ Component, pageProps }: AppProps) {
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const start = () => { setLoading(true) };
    const end = () => { setLoading(false) };

    Router.events.on("routeChangeStart", start);
    Router.events.on("routeChangeComplete", end);
    Router.events.on("routeChangeError", end);

    return () => {
      Router.events.off("routeChangeStart", start);
      Router.events.off("routeChangeComplete", end);
      Router.events.off("routeChangeError", end);
    };
  }, []);

  if (loading) {
    return <LoadingFullPage />
  }

  return <Component {...pageProps} />
}

export default MyApp
