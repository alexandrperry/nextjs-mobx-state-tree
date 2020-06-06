import Layout from 'components/Layout';
import { useMst } from 'store';
import { useState, useEffect } from 'react';

const SearchPage = () => {
  const [value, setValue] = useState('');
  const {
    autoSearch: { data, fetch }
  } = useMst();
  console.log(data);
  useEffect(() => {
    if (value) {
      fetch(value);
    }
  }, [value]);
  return (
    <Layout>
      <input value={value} onChange={(e) => setValue(e.target.value)} />
    </Layout>
  );
};

export default SearchPage;
