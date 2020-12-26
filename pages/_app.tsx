import { AppProps } from 'next/app';
import Router from 'next/router';
import NProgress from 'nprogress';
import 'styles/index.css';
import 'antd/dist/antd.css';
import 'styles/nprogress.css';
import { rootStore, Provider } from 'store';
import 'mobx-react/batchingForReactDom';

Router.events.on('routeChangeStart', () => {
  NProgress.start();
});
Router.events.on('routeChangeComplete', () => NProgress.done());
Router.events.on('routeChangeError', () => NProgress.done());

export default function ({ Component, pageProps }: AppProps) {
  return (
    <Provider value={rootStore}>
      <Component {...pageProps} />
    </Provider>
  );
}
