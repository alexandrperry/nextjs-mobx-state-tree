import React from 'react';
import Header from 'components/Header';
import { useMst } from 'store';

type Props = {
  title?: string;
};

const Layout: React.FunctionComponent<Props> = ({ children }) => {
  return (
    <>
      <Header />
      <main>{children}</main>
    </>
  );
};

export default Layout;
