import { getSnapshot } from 'mobx-state-tree';
import { initializeStore } from 'store';

const Ssg = (props) => <p>{JSON.stringify(props)}</p>;

// If you build and start the app, the date returned here will have the same
// value for all requests, as this method gets executed at build time.
export default Ssg;
export async function getStaticProps() {
  const store = initializeStore();

  await store.autoSearch.fetch('barc');

  return { props: getSnapshot(store) };
}
