import { getSnapshot } from 'mobx-state-tree';
import { RootInstance, rootStore } from 'store';

const Ssg: React.FC<RootInstance> = (props) => <p>{JSON.stringify(props)}</p>;

export default Ssg;

export async function getStaticProps() {
  await rootStore.autoSearch.fetch('barc');

  return { props: getSnapshot(rootStore) };
}
