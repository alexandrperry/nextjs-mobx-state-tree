import React from 'react';
import Header from 'components/Header';
import { useMst } from 'store';

type Props = {
  title?: string;
};

const Layout: React.FunctionComponent<Props> = ({ children }) => {
  const {
    autoSearch: { data }
  } = useMst();
  console.log('data', data);
  return (
    <>
      <Header data={data} />
      <main>{children}</main>
    </>
  );
};

export default Layout;
