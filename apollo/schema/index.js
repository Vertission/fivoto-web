import { AD, CATEGORY, ADS, LOCATION, FIELD, ME, CONFIG } from './query';
import { CREATE_AD, UPDATE_AD, UPDATE_USER } from './mutation';

export default {
  query: {
    AD,
    CATEGORY,
    ADS,
    LOCATION,
    FIELD,
    ME,
    CONFIG,
  },
  mutation: { CREATE_AD, UPDATE_AD, UPDATE_USER },
};
