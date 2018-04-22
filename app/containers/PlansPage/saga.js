import moment from 'moment';
import { message } from 'antd';

import { throttle, put, call } from 'redux-saga/effects';
import { graphqlFetch, requestErrorHandler } from '../../utils/graphqlFetchUtils';

import { DATA_LOADING_ASYNC, DATA_ERROR, DATA_LOADED, DATA_LOADING, UPDATE_PLAN_ASYNC, CREATE_PLAN_ASYNC, SET_TABLEDATA, ADD_TABLEDATA, CLOSE_MODAL, PLANSTATUS_OBJ } from './constants';

// 数据处理基本单位
function dealWithItem(oldItem) {
  const newItem = Object.assign({}, oldItem);
  newItem.planStatus = PLANSTATUS_OBJ.unstart;
  if (newItem.start)newItem.planStatus = PLANSTATUS_OBJ.doing;
  if (newItem.end)newItem.planStatus = PLANSTATUS_OBJ.done;
  newItem.key = newItem.id; // 给antd---table用的
  return newItem;
}

function dealWithPlanData(plans) {
  const backArr = [];
  plans.forEach((item) => {
    backArr.push(dealWithItem(item));
  });
  return backArr;
}

function* loadDataAsync(action) {
  yield put({ type: DATA_LOADING });
  const params = action.params;
  const query = `
    query{
      plans(state:"${params.planStatus}"){
        id,
        title,
        des,
        level,
        start,
        end,
        status,
        createdAt,
      }
    }
  `;
  const str = `query=${query}`;
  try {
    const backData = yield call(graphqlFetch, {
      body: str,
    });
    const dataToSet = dealWithPlanData(backData.plans);
    yield put({ type: SET_TABLEDATA, data: dataToSet });
    yield put({ type: DATA_LOADED });
  } catch (e) {
    yield put({ type: DATA_ERROR });
    yield requestErrorHandler(e);
  }
}

function* updatePlanAsync(action) {
  const params = action.params;
  const id = params.id;
  const title = params.title ? `title:"${params.title}"` : '';
  let des = params.des ? `des:"${params.des}"` : '';
  const level = params.level !== undefined ? `level:${params.level}` : '';// level是可以等于0的
  const status = params.status ? `status:${params.status}` : '';
  const start = params.start ? `start:"${moment().format('YYYY-MM-DD HH:mm:ss')}"` : '';
  const end = params.end ? `end:"${moment().format('YYYY-MM-DD HH:mm:ss')}"` : '';

  des = des.replace(/\n/g, '\\n');// 会有提行

  const mutation = `
    mutation{
    updatePlan(plan:{
      id:${id}
      ${title}
      ${des}
      ${level}
      ${status}
      ${start}
      ${end}
    }){
      id,
      title,
      des,
      level,
      start,
      end,
      status,
      createdAt,
    }}
  `;
  const str = `query=${mutation}`;
  try {
    const backData = yield call(graphqlFetch, {
      body: str,
    });
    if (process.env.NODE_ENV === 'development')console.log(backData);
    const dataToSet = dealWithItem(backData.updatePlan);
    yield put({ type: ADD_TABLEDATA, data: dataToSet });// 起名起的是ADD_TABLEDATA实际上ADD的处理包含了UPDATE
    message.success('修改成功', 2);
  } catch (e) {
    yield requestErrorHandler(e);
  }
}

function* createPlanAsync(action) {
  const params = action.params;
  // message.loading('正在提交...NEW PLAN', 2);// 默认 3 秒 todo 交互体验什么的，后话，自己玩玩儿也不需要全部加个loading什么的吧emmm
  const title = params.title ? `title:"${params.title}"` : '';
  let des = params.des ? `des:"${params.des}"` : '';
  const level = params.level !== undefined ? `level:${params.level}` : '';// level是可以等于0的，虽然后台默认也是0，另外 level注意，不是字符串，额，后台没做太多处理
  const start = params.start ? `start:"${moment().format('YYYY-MM-DD HH:mm:ss')}"` : '';
  const end = params.end ? `end:"${moment().format('YYYY-MM-DD HH:mm:ss')}"` : '';

  des = des.replace(/\n/g, '\\n');// ......模板字符串机制要了解下

  const mutation = `
  mutation{
    createPlan(plan:{
      ${title}
      ${des}
      ${level}
      ${start}
      ${end}
    }){
        id,
        title,
        des,
        level,
        start,
        end,
        status,
        createdAt,
      }
    }
  `;
  const str = `query=${encodeURIComponent(mutation)}`;
  if (process.env.NODE_ENV === 'development')console.log(str);
  try {
    const backData = yield call(graphqlFetch, {
      body: str,
    });
    if (process.env.NODE_ENV === 'development')console.log(backData);
    const dataToAdd = dealWithItem(backData.createPlan);
    yield put({ type: ADD_TABLEDATA, data: dataToAdd });
    message.success('提交成功');
    yield put({ type: CLOSE_MODAL }); // 关闭新建PLAN的弹出层
  } catch (e) {
    yield requestErrorHandler(e);
  }
}

export function* watchLoadDataAsync() {
  yield throttle(500, DATA_LOADING_ASYNC, loadDataAsync);
}
export function* watchUpdateDataAsync() {
  yield throttle(500, UPDATE_PLAN_ASYNC, updatePlanAsync);
}
export function* watchCreateDataAsync() {
  yield throttle(500, CREATE_PLAN_ASYNC, createPlanAsync);
}
