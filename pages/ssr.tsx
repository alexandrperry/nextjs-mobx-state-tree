import { getSnapshot } from 'mobx-state-tree';
import { rootStore, RootInstance } from 'store';

const Ssg: React.FC<RootInstance> = (props) => <p>{JSON.stringify(props)}</p>;

// If you build and start the app, the date returned here will have the same
// value for all requests, as this method gets executed at build time.
export default Ssg;
export async function getServerSideProps() {
  await rootStore.autoSearch.fetch('par');
  return { props: getSnapshot(rootStore) };
}
