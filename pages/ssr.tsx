import { getSnapshot } from 'mobx-state-tree';
import { rootStore, RootInstance } from 'store';

const Ssg: React.FC<RootInstance> = (props) => <p>{JSON.stringify(props)}</p>;

export default Ssg;

export async function getServerSideProps() {
  await rootStore.autoSearch.fetch('par');
  return { props: getSnapshot(rootStore) };
}
