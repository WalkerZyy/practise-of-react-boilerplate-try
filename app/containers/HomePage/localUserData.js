// todo 虽然可以保存状态，但是两个不同的窗口间的状态还是不共享的，也就是说，一边登出后，另一边的state里并没有退出，也就是说token不应该再存在state里

const initUserData = {
  token: undefined,
  username: undefined,
};

export function getLocalUserData() {
  const userData = localStorage.getItem('userData');
  if (process.env.NODE_ENV === 'development')console.log(userData);
  if (!userData) {
    return cleanLocalUserData();
  }
  return JSON.parse(userData);
}

export function setLocalUserData(backData) {
  const dataForSave = getLocalUserData();
  dataForSave.username = backData.username;
  dataForSave.token = backData.token;
  localStorage.setItem('userData', JSON.stringify(dataForSave));
  return backData;
}

export function cleanLocalUserData() {
  localStorage.setItem('userData', JSON.stringify(initUserData));
  return JSON.stringify(initUserData);
}

export function getTokenFromLocal() {
  // store里的token最终也只是从这里提取的函数，token还是要存localStorage
  return getLocalUserData().token;
}
