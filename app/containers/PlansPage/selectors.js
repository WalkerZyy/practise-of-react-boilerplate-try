const selectPlan = (state) => state.get('plansPage');

const getCollapsed = (state) => selectPlan(state).get('collapsed');
const getLoading = (state) => selectPlan(state).get('tableLoading');
const getTableData = (state) => selectPlan(state).get('tableData');
const getPlanStatus = (state) => selectPlan(state).get('planStatus');
const getModalVisibility = (state) => selectPlan(state).get('modalVisible');
export {
  getCollapsed,
  getLoading,
  getTableData,
  getPlanStatus,
  getModalVisibility,
};
