import {
  LOGIN_ASYNC,
} from './constants';

export function doLogin(params) {
  return {
    type: LOGIN_ASYNC,
    params,
  };
}
