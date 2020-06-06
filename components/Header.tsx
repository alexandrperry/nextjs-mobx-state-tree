import { useObserver } from 'mobx-react';
import Link from 'next/link';

const Header = ({ data }) => {
  return useObserver(() => (
    <header>
      {JSON.stringify(data)}
      <Link href="/">Click</Link>
    </header>
  ));
};

export default Header;
