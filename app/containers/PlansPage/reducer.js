import { fromJS } from 'immutable';

import { COLLAPSE_SLIDER, OPEN_SLIDER, DATA_LOADING, DATA_LOADED, DATA_ERROR, SET_TABLEDATA, SET_PLANSTATUS, OPEN_MODAL, CLOSE_MODAL, ADD_TABLEDATA } from './constants';

const initialState = fromJS({
  collapsed: false,
  tableLoading: false,
  tableData: [],
  planStatus: 'all', // doing,done,all,unstart
  modalVisible: false,
});

export default function (state = initialState, action) {
  switch (action.type) {
    case COLLAPSE_SLIDER:
      return state.set('collapsed', true);
    case OPEN_SLIDER:
      return state.set('collapsed', false);
    case DATA_LOADING:
      return state.set('tableLoading', true);
    case DATA_LOADED:
      return state.set('tableLoading', false);
    case DATA_ERROR:
      return state.set('tableLoading', false);
    case SET_TABLEDATA:
      return state.set('tableData', action.data);
    case SET_PLANSTATUS:
      return state.set('planStatus', action.planStatus);
    case OPEN_MODAL:
      return state.set('modalVisible', true);
    case CLOSE_MODAL:
      return state.set('modalVisible', false);
    case ADD_TABLEDATA:
      return state.set('tableData', addTableData(state.get('tableData'), action.data));
    default:
      return state;
  }
}


function addTableData(oldArr, addData) {
  const newArr = [];
  let used = false;
  // 降序排布
  for (let i = 0; i < oldArr.length;) {
    if (oldArr[i].id === addData.id) {
      if (addData.status !== 1) { // 已经删除则不再加入
        newArr.push(addData);
      }
      used = true;
    } else {
      if (!used && oldArr[i].id < addData.id) {
        newArr.push(addData); used = true;
      }
      newArr.push(oldArr[i]);
    }
    i += 1;
  }
  return newArr;
}
