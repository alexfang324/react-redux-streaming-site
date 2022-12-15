import _ from 'lodash';

import {
  CREATE_STREAM,
  FETCH_STREAMS,
  FETCH_STREAM,
  EDIT_STREAM,
  DELETE_STREAM
} from '../actions/types';

export default (state = {}, action) => {
  switch (action.type) {
    case FETCH_STREAMS:
      return { ...state, ..._.mapKeys(action.payload, 'id') };

    case FETCH_STREAM || CREATE_STREAM || EDIT_STREAM:
      //the [] is key:value pair interpolation syntax for create/update a key:val pair into obj
      return { ...state, [action.payload.id]: action.payload };

    case DELETE_STREAM:
      return delete state[action.payload];

    default:
      return state;
  }
};
