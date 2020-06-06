import { useObserver } from 'mobx-react';
import Link from 'next/link';

import { AutosearchStore } from 'store/autoSearch';

interface Props {
  data: AutosearchStore['data'];
}

const Header: React.FC<Props> = ({ data }) => {
  return useObserver(() => (
    <header>
      {JSON.stringify(data)}
      <Link href="/">Click</Link>
    </header>
  ));
};

export default Header;
