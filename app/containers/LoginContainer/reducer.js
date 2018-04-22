import { fromJS } from 'immutable';
import {
  LOGIN_SUCCESS,
  LOGIN,
  LOGIN_ERROR,
} from './constants';

// 实际上这几个状态并没有用到
const initialState = fromJS({
  logining: false,
  error: false,
});

function loginReducer(state = initialState, action) {
  switch (action.type) {
    case LOGIN:
      return state
        .set('logining', true)
        .set('error', false);
    case LOGIN_SUCCESS:
      return state
        .set('logining', false);
    case LOGIN_ERROR:
      return state
        .set('error', action.error)
        .set('logining', false);
    default:
      return state;
  }
}

export default loginReducer;
