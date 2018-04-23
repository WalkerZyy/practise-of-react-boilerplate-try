import {
  COLLAPSE_SLIDER, OPEN_SLIDER, DATA_LOADING_ASYNC, SET_PLANSTATUS, OPEN_MODAL, CLOSE_MODAL, UPDATE_PLAN_ASYNC, CREATE_PLAN_ASYNC,
} from './constants';

export function collapseSlider() {
  return {
    type: COLLAPSE_SLIDER,
  };
}
export function openSlider() {
  return {
    type: OPEN_SLIDER,
  };
}

// planStatus——doing,done,all,unstart
export function setPlanStatus(planStatus) {
  return {
    type: SET_PLANSTATUS,
    planStatus,
  };
}

export function openModal() {
  return {
    type: OPEN_MODAL,
  };
}

export function closeModal() {
  return {
    type: CLOSE_MODAL,
  };
}


// ----------------------ASYNC
export function loadDataAsync(planStatus) {
  if (process.env.NODE_ENV === 'development')console.log('DATA_LOADING_ASYNC', planStatus);
  return {
    type: DATA_LOADING_ASYNC,
    params: {
      planStatus,
    },
  };
}

export function updateDataAsync(params) {
  if (process.env.NODE_ENV === 'development')console.log('UPDATE_PLAN_ASYNC', params);
  return {
    type: UPDATE_PLAN_ASYNC,
    params,
  };
}
export function createDataAsync(params, callback) {
  if (process.env.NODE_ENV === 'development')console.log('CREATE_PLAN_ASYNC', params);
  return {
    type: CREATE_PLAN_ASYNC,
    params,
    callback,
  };
}

