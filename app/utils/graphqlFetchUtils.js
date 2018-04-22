import 'whatwg-fetch';
import { message } from 'antd';
import { put } from 'redux-saga/effects';
import { getTokenFromLocal } from 'containers/HomePage/localUserData';
import { serverHost } from 'containers/App/constants';
import { resetUserdata } from 'containers/HomePage/actions';
// import { push } from 'react-router-redux';

// import { store } from '../app';

export function checkStatus(response) {
  if (response.status >= 200 && response.status < 300) {
    return response;
  }
  const error = new Error(`${response.statusText}---${response.status}`);
  error.response = response;
  throw error;
}

export function parseJSON(response) {
  return response.json();
}

// 通用graphql请求函数，我感觉我为了扔出这个错误也是够了，因为外部逻辑需要错误来控制
export function* graphqlFetch(params) {
  try {
    const token = getTokenFromLocal();
    if (!token)alert('token异常');
    if (!params)alert('graphqlFetch参数异常');
    if (process.env.NODE_ENV === 'development')console.log('request body', params.body);
    const backData = yield fetch(`${serverHost}/graphql`, {
      method: 'POST',
      headers: {
        authorization: `Bearer ${token}`,
        'Content-Type': 'application/x-www-form-urlencoded',
      },
      body: params.body,
    }).then(checkStatus).then(parseJSON).then((data) => {
      if (process.env.NODE_ENV === 'development')console.log('Response Data', data);
      if (data.errors) {
        if (data.errors[0].type) {
          throw new Error(JSON.stringify(data.errors[0]));
        } else {
          throw new Error(data.errors[0].message);
        }
      } else {
        return data.data;
      }
    }).catch((error) => {
      throw error;
    });
    // 返回异步数据
    return backData;
  } catch (e) {
    throw e;
  }
}

// 通用错误处理
export function* requestErrorHandler(e) {
  if (process.env.NODE_ENV === 'development')console.log('request failed:', e, e.response);
  try {
    if (e.response && e.response.statusText === 'Unauthorized') {
      // 直接跳转的话体验应该也不好额
      // store.dispatch(push({ pathname: '/login', state: { msg: '未登录或登录过期，请重新登录' } }));
      message.error('未登录或登录过期，请重新登录');
      yield put(resetUserdata());
      return;
    }
  } catch (error) {
    console.log(error);
  }
  let err = e;
  if (err.type) { err = err.message; }
  message.error(`request failed: ${err}`);
}
