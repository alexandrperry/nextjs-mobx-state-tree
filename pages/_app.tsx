import { AppProps } from 'next/app';
import Router from 'next/router';
import NProgress from 'nprogress';
import 'styles/normalize.css';
import 'styles/index.scss';
import 'styles/nprogress.css';
import { useEffect } from 'react';
import { rootStore, Provider } from 'store';
import 'mobx-react/batchingForReactDom';

Router.events.on('routeChangeStart', () => {
  NProgress.start();
});
Router.events.on('routeChangeComplete', () => NProgress.done());
Router.events.on('routeChangeError', () => NProgress.done());

export default function ({ Component, pageProps }: AppProps) {
  useEffect(() => {
    document.body.classList.remove('preload');
  }, []);
  console.log('pageProps', pageProps);
  return (
    <Provider value={rootStore}>
      <Component {...pageProps} />
    </Provider>
  );
}
