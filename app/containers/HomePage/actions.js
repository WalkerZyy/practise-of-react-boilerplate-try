import { SHOW_LOGIN_ENTRY, HIDE_LOGIN_ENTRY, SET_USERDATA, RESET_USERDATA } from './constants';
import { cleanLocalUserData } from './localUserData';
export function showLoginEntry() {
  return {
    type: SHOW_LOGIN_ENTRY,
  };
}

export function hideLoginEntry() {
  if (process.env.NODE_ENV === 'development')console.log('hideLoginEntry');
  return {
    type: HIDE_LOGIN_ENTRY,
  };
}

export function setUserdata() {
  if (process.env.NODE_ENV === 'development')console.log('setUserdata');
  return {
    type: SET_USERDATA,
  };
}

export function resetUserdata() {
  if (process.env.NODE_ENV === 'development')console.log('resetUserdata');
  cleanLocalUserData();
  return {
    type: RESET_USERDATA,
  };
}
