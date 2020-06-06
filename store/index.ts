import React, { useContext } from 'react';
import {
  applySnapshot,
  Instance,
  SnapshotIn,
  SnapshotOut,
  types,
  onSnapshot
} from 'mobx-state-tree';
import { FETCH_STATUS } from 'utils/constants';
import { autoSearchStore } from './autoSearch';

let store: RootInstance | undefined;

const RootModel = types.model({
  autoSearch: autoSearchStore
});

export const rootStore = RootModel.create({
  autoSearch: { state: FETCH_STATUS.INIT }
});

onSnapshot(rootStore, (snapshot) => console.log('Snapshot: ', snapshot));

export type RootInstance = Instance<typeof RootModel>;
const RootStoreContext = React.createContext<null | RootInstance>(null);

export const { Provider } = RootStoreContext;
export function useMst() {
  const store = useContext(RootStoreContext);
  if (store === null) {
    throw new Error('Store cannot be null, please add a context provider');
  }
  return store;
}

export function initializeStore(snapshot = null) {
  const _store = store ?? rootStore;

  // If your page has Next.js data fetching methods that use a Mobx store, it will
  // get hydrated here, check `pages/ssg.tsx` and `pages/ssr.tsx` for more details
  if (snapshot) {
    applySnapshot(_store, snapshot);
  }
  // For SSG and SSR always create a new store
  if (typeof window === 'undefined') return _store;
  // Create the store once in the client
  if (!store) store = _store;

  return store;
}
