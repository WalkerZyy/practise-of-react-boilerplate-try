// 就我这个状态量级。。。不太用得上这个其实,暂时emmmm不这样写？？
// import { createSelector } from 'reselect';
//
// const selectHome = (state) => state.get('homePage');
//
// const getLoginVisibility = () => createSelector(
//   selectHome,
//   (homeState) => homeState.get('loginVisibility')
// );
//
// export {
//   selectHome,
//   getLoginVisibility,
// };
const selectHome = (state) => state.get('homePage');

const getLoginVisibility = (state) => selectHome(state).get('loginVisibility');
const getUserName = (state) => selectHome(state).get('username');
const getToken = (state) => selectHome(state).get('token')(); // 唯独token是个fun

export {
  getLoginVisibility,
  getUserName,
  getToken,
};
