import Layout from 'components/Layout';
import { useMst } from 'store';
import { useState, useEffect } from 'react';
import { Input } from 'antd';
import { useObserver } from 'mobx-react';
import { autoSearchItem } from 'store/autoSearch';

const Index = () => {
  const [value, setValue] = useState('');
  const { autoSearch } = useMst();
  useEffect(() => {
    if (value) {
      autoSearch.fetch(value);
    }
  }, [value]);

  const handleKeyDown = (
    e: React.KeyboardEvent<HTMLDivElement>,
    item: autoSearchItem
  ) => {
    if (e.keyCode === 13) {
      autoSearch.chooseCity(item);
    }
  };

  return useObserver(() => (
    <Layout>
      <Input
        value={value}
        onChange={(e) => setValue(e.target.value)}
        placeholder="Find a city"
        autoFocus
      />
      <>
        {autoSearch.data.map((item) => (
          <div
            role="button"
            tabIndex={0}
            onClick={() => autoSearch.chooseCity(item)}
            onKeyDown={(e) => handleKeyDown(e, item)}
            style={{ cursor: 'pointer' }}
          >
            {item.defaultName}
          </div>
        ))}
      </>
    </Layout>
  ));
};

export default Index;
