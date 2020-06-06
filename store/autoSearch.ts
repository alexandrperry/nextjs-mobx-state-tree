import React, { useContext } from 'react';
import {
  applySnapshot,
  Instance,
  SnapshotIn,
  SnapshotOut,
  types,
  flow
} from 'mobx-state-tree';
import fetchAutocomplete from 'services/fetchAutocomplete';
import { FETCH_STATUS } from 'utils/constants';

const autoSearchItem = types.model({
  defaultName: types.string,
  countryCode: types.string
});

export const autoSearchStore = types
  .model({
    state: types.enumeration<FETCH_STATUS>(
      'status',
      Object.values(FETCH_STATUS)
    ),
    data: types.array(autoSearchItem)
  })
  .actions((self) => {
    const fetch = flow(function* (query: string) {
      // <- note the star, this a generator function!
      self.state = FETCH_STATUS.LOADING;
      try {
        // ... yield can be used in async/await style
        const { data } = yield fetchAutocomplete(query);
        console.log(data);
        self.data = data;
        self.state = FETCH_STATUS.SUCCESS;
      } catch (error) {
        // ... including try/catch error handling
        console.error('Failed to fetch autosearch', error);
        self.state = FETCH_STATUS.ERROR;
      }
    });
    return { fetch };
  });

type AutosearchStore = Instance<typeof autoSearchStore>;
