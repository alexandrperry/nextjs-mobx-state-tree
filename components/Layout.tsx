import React from 'react';
import Header from 'components/Header';

type Props = {
  title?: string;
};

const Layout: React.FunctionComponent<Props> = ({ children }) => {
  return (
    <>
      <Header />
      <p>Helo</p>
      <main>{children}</main>
    </>
  );
};

export default Layout;
