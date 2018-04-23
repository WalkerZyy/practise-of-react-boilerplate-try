import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { compose, bindActionCreators } from 'redux';
import { Table, Modal } from 'antd';
import EditableCell from 'components/tablecells/EditableCell';
import ExpandedRow from 'components/tablecells/ExpandedRow';
import moment from 'moment';

import { watchLoadDataAsync, watchUpdateDataAsync } from './saga';
import injectSaga from '../../utils/injectSaga';
import { getLoading, getTableData, getPlanStatus } from './selectors';
import { loadDataAsync, updateDataAsync } from './actions';

// table的diy子组件太多了，单独放
import LevelSelector from './tableComps/LevelSelector';
import StartusMark from './tableComps/StartusMark';
import BtnOrDate from './tableComps/BtnOrDate';
/*
题目——可修改
建立时间
没有开始时间——开始>>>>没有结束时间——结束
优先度---颜色选择
其它操作——删除

描述——展开项——可修改

状态，用图标表示好了  2012-12-21（可以省略时间，只是比较的时候比较，在描述中详细展示）

6+1项

时间定长*3 窄*2 题目*1
 */
/*
修改---成功----拉数据
 */
const confirm = Modal.confirm;

function showDeleteConfirm(successFun) {
  confirm({
    title: 'Are you sure delete this Plan?',
    content: 'emmmm......你确定要删吗？',
    okText: '就要删',
    okType: 'danger',
    cancelText: '按错了',
    onOk() {
      successFun();
    },
    onCancel() {},
  });
}
function sortCreate(a, b) { return moment(a.createdAt) - moment(b.createdAt); }
function sortStart(a, b) {
  if (!a.start && !b.start) {
    return sortCreate(a, b);
  }
  if (!a.start) return -1;
  if (!b.start) return 1;
  return (moment(a.start) - moment(b.start));
}
function sortEnd(a, b) {
  if (!a.end && !b.end) { // 没有结束时间，比start时间
    return sortStart(a, b);
  }
  if (!a.end) return -1;
  if (!b.end) return 1;
  return (moment(a.end) - moment(b.end));
}

class PlanTable extends React.PureComponent {
  constructor(props) {
    super(props);
    this.columns = [{
      // 这个是progress，是生成的
      title: '状态',
      dataIndex: 'planStatus',
      key: 'planStatus',
      render: (text) => <StartusMark value={text}></StartusMark>,
    }, {
      title: '名称',
      dataIndex: 'title',
      key: 'title',
      render: (text, record) => (
        <EditableCell
          value={text}
          onChange={this.onCellChange(record.id, 'title')}
        />
      ),
    }, {
      title: '创建时间',
      dataIndex: 'createdAt',
      key: 'createdAt',
      sorter: sortCreate,
    }, {
      title: '优先级',
      dataIndex: 'level',
      key: 'level',
      render: (text, record) => (
        <LevelSelector
          value={text}
          onChange={this.onCellChange(record.id, 'level')}
        />
      ),
    }, {
      title: '开始时间',
      dataIndex: 'start',
      key: 'start',
      render: (text, record) => <BtnOrDate value={text} onBtnClick={this.onCellChange(record.id, 'start')} >开始</BtnOrDate>,
      sorter: sortStart,
    }, {
      title: '结束时间',
      dataIndex: 'end',
      key: 'end',
      render: (text, record) => <BtnOrDate value={text} hasCondition condition={record.start} onBtnClick={this.onCellChange(record.id, 'end')} >结束</BtnOrDate>,
      sorter: sortEnd,
    }, {
      title: '其它',
      render: (text, record) => {
        const successFun = () => ((this.onCellChange(record.id, 'delete'))());
        const clickHandler = () => (showDeleteConfirm(successFun));
        return <a role="button" tabIndex="0" onClick={clickHandler} >删除</a>;
      },
    }];
  }
  componentWillMount() {
    this.props.loadDataAsync(this.props.planStatus);
  }
  onCellChange = (id, dataIndex) => (value) => {
    // console.log('onCellChange', id, dataIndex, value);
    if (dataIndex === 'start') {
      this.props.updateDataAsync({ start: true, id });
    } else if (dataIndex === 'end') {
      this.props.updateDataAsync({ end: true, id });
    } else if (dataIndex === 'title') {
      this.props.updateDataAsync({ title: value, id });
    } else if (dataIndex === 'level') {
      this.props.updateDataAsync({ level: value, id });
    } else if (dataIndex === 'delete') {
      this.props.updateDataAsync({ status: 1, id });
    } else if (dataIndex === 'des') {
      this.props.updateDataAsync({ des: value, id });
    }
  }
  render() {
    const columns = this.columns;
    const loading = this.props.loading;
    const dataSource = this.props.dataSource;
    return (
      <Table
        bordered
        dataSource={dataSource}
        columns={columns}
        loading={loading}
        expandedRowRender={(record) => (<ExpandedRow txt={record.des} onChange={this.onCellChange(record.id, 'des')} ></ExpandedRow>)}
      />
    );
  }
}

PlanTable.propTypes = {
  loading: PropTypes.bool,
  planStatus: PropTypes.string,
  dataSource: PropTypes.array,
  loadDataAsync: PropTypes.func,
  updateDataAsync: PropTypes.func,
};

function dataFilter(data, planStatus) {
  const backData = [];
  data.forEach((item) => {
    if (planStatus === 'all') {
      backData.push(item);
    } else if (item.planStatus === planStatus)backData.push(item);
  });
  return backData;
}

function mapStateToProps(state) {
  return {
    loading: getLoading(state),
    dataSource: dataFilter(getTableData(state), getPlanStatus(state)),
    planStatus: getPlanStatus(state),
  };
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators({ loadDataAsync, updateDataAsync }, dispatch);
}

const withConnect = connect(mapStateToProps, mapDispatchToProps);
const withSaga = injectSaga({ key: 'plans/watchLoadDataAsync', saga: watchLoadDataAsync });
const withSaga2 = injectSaga({ key: 'watchUpdateDataAsync', saga: watchUpdateDataAsync });

export default compose(
  withSaga,
  withSaga2,
  withConnect,
)(PlanTable);
