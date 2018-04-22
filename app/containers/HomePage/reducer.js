import { fromJS } from 'immutable';
import { getLocalUserData } from './localUserData';

import { SHOW_LOGIN_ENTRY, HIDE_LOGIN_ENTRY, SET_USERDATA, RESET_USERDATA } from './constants';

const initialState = fromJS({
  loginVisibility: false,
  username: undefined,
  token: () => getLocalUserData().token,
});

function homePageReducer(state = initialState, action) {
  switch (action.type) {
    case SHOW_LOGIN_ENTRY:
      return state.set('loginVisibility', true);
    case HIDE_LOGIN_ENTRY:
      return state.set('loginVisibility', false);
    case SET_USERDATA:
      return state.set('username', getLocalUserData().username);
    case RESET_USERDATA:
      return state.set('username', undefined);
    default:
      return state;
  }
}

export default homePageReducer;
