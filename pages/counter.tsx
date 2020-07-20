import Layout from 'components/Layout';
import { observer } from 'mobx-react';
import { useStores } from 'store2';

const Counter = observer(() => {
  const { counterStore } = useStores();

  return (
    <Layout>
      <div>{counterStore.count}</div>
      <button onClick={() => counterStore.increment()}>++</button>
      <button onClick={() => counterStore.decrement()}>--</button>
    </Layout>
  );
});

export default Counter;
