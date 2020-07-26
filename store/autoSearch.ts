import { Instance, types, flow } from 'mobx-state-tree';
import fetchAutocomplete from 'services/fetchAutocomplete';
import { FETCH_STATUS } from 'utils/constants';

// const selectedCity = types.maybeNull(
//   types.reference(autoSearchItem, {
//     // given an identifier, find the user
//     get(identifier /* string */, parent: any /*Store*/) {
//       return parent.data.find((u) => u.positionId === identifier) || null;
//     },
//     // given a user, produce the identifier that should be stored
//     set(value /* User */) {
//       return value.positionId;
//     }
//   })
// );

import { fetchInstance } from 'utils/fetch';
import { CancelTokenSource } from 'axios';

const autoSearchItem = types.model({
  defaultName: types.string,
  countryCode: types.string,
  positionId: types.identifierNumber,
  population: types.number
});

let source: CancelTokenSource;

const selectedCity = types.maybeNull(types.string);

export const autoSearchStore = types
  .model({
    state: types.enumeration<FETCH_STATUS>(
      'status',
      Object.values(FETCH_STATUS)
    ),
    data: types.array(autoSearchItem),
    selectedCity
  })
  .actions((self) => {
    const fetch = flow(function* (query: string) {
      // <- note the star, this a generator function!
      self.state = FETCH_STATUS.LOADING;
      try {
        // ... yield can be used in async/await style
        if (source) {
          source.cancel('Operation canceled by the user.');
        }
        source = fetchInstance.CancelToken.source();
        const { data } = yield fetchAutocomplete(query, source);
        self.data = data;
        self.state = FETCH_STATUS.SUCCESS;
      } catch (error) {
        // ... including try/catch error handling
        console.error('Failed to fetch autosearch', error);
        self.state = FETCH_STATUS.ERROR;
      }
    });
    const chooseCity = function (data: autoSearchItem) {
      self.selectedCity = data.defaultName;
    };
    return { fetch, chooseCity };
  });

export type AutosearchStore = Instance<typeof autoSearchStore>;

export type autoSearchItem = Instance<typeof autoSearchItem>;
