import createContext from 'react-recontext';
import _ from 'lodash';

export const initState = {
  query: '',
  category: {
    field: null,
    item: null,
  },
  location: {
    district: null,
    city: null,
  },
  first: 20,
};

export const { dispatch, Context, Provider } = createContext({
  displayName: 'SearchContext',
  initState,
  actions: {
    SET_QUERY: (state, query) => ({
      ...state,
      query,
    }),
    SET_CATEGORY: (state, category) => ({
      ...state,
      category,
    }),
    SET_LOCATION: (state, location) => ({
      ...state,
      location,
    }),
    SET_RESET: () => initState,
  },
  isEnableLog: true,
});

export default {
  dispatch,
  Context,
  Provider,
};
