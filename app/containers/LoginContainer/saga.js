import { takeEvery } from 'redux-saga';
import { put } from 'redux-saga/effects';
import 'whatwg-fetch';
import { setLocalUserData } from 'containers/HomePage/localUserData';
import { setUserdata, hideLoginEntry } from 'containers/HomePage/actions';
import { goBack } from 'react-router-redux';

import { checkStatus, parseJSON, requestErrorHandler } from '../../utils/graphqlFetchUtils';
import { serverHost } from '../App/constants';
import { LOGIN_ASYNC } from './constants';


function* loginAsync(action) {
  const params = action.params;
  const str = `username=${params.username}&password=${params.password}`;// Body传入参数，只能传啊a=1&b=2...这种参数形式 fetch没有jquery中，传入对象框架会自动封装成formData的功能
  try {
    yield fetch(`${serverHost}/graphql/login`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
      },
      body: str,
    }).then(checkStatus).then(parseJSON).then((data) => {
      if (process.env.NODE_ENV === 'development')console.log('loginResponse', data);
      if (data.errors) {
        alert(data.errors[0].message);
        throw new Error(data.errors[0].message);
      } else {
        setLocalUserData(data.data);
      }
    }).catch((error) => {
      throw error;
    });
  } catch (e) {
    // generator的好处就是可以用try catch捕获promise的错误
    yield requestErrorHandler(e);
    return;
  }

  yield put(setUserdata());
  if (action.params.noMask) {
    yield put(goBack());// 如果不是用的弹出框而是页面，那就要在登录成功之后跳转
  } else {
    yield put(hideLoginEntry());
  }
}

export default function* watchLoginAsync() {
  yield takeEvery(LOGIN_ASYNC, loginAsync);
}

