import { observer } from 'mobx-react';
import Link from 'next/link';
import { useMst } from 'store';

const Header: React.FC = observer(() => {
  const data = useMst();
  return (
    <header style={{ display: 'flex' }}>
      <div style={{ flex: 3 }}>
        <span>
          My city:
          {data.autoSearch.selectedCity}
        </span>
      </div>
      <div style={{ flex: 1, display: 'flex', justifyContent: 'space-evenly' }}>
        <Link href="/">Client search</Link>
        <Link href="/ssr">SSR</Link>
        <Link href="/ssg">SSG</Link>
      </div>
    </header>
  );
});

export default Header;
