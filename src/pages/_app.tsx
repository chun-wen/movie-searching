import '@/styles/globals.scss';
import { Provider } from 'react-redux';

import store from '@/Redux/store';

import Layout from '@/components/layout';

import type { AppProps } from 'next/app';
export default function App({ Component, pageProps }: AppProps) {
  return (
    <Provider store={store}>
      <Layout>
        <Component {...pageProps} />
      </Layout>
    </Provider>
  );
}
