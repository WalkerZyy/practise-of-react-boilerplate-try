import React from 'react';
import styled from 'styled-components';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { compose, bindActionCreators } from 'redux';
import { Modal, Input, Checkbox, Row, Col, Alert } from 'antd';
import { planTextAreaMaxCnt } from 'components/tablecells/constants';

import LevelSelector from './tableComps/LevelSelector';
import { getModalVisibility } from './selectors';
import { closeModal, createDataAsync } from './actions';
import injectSaga from '../../utils/injectSaga';
import { watchCreateDataAsync } from './saga';
const { TextArea } = Input;

const MyRow = styled(Row)`
  margin-bottom:10px;
`;
const PP = styled.p`
  text-align:right;
`;

// 有点不确定string.trim的兼容性
function myTrim(x) {
  return x.replace(/^\s+|\s+$/gm, '');
}

const max = planTextAreaMaxCnt;

// 默认宽度是520，真好呢
class NewPlanModal extends React.PureComponent {
  componentWillMount() {
    this.initState();
  }
  onTyping = (e) => {
    const v = e.target.value || '';
    this.setState({ des: v.substring(0, max) });
  }
  onChangeCheckbox=(e) => {
    this.setState({ startRightNow: e.target.checked });
  }
  handleLevelChange=(value) => {
    this.setState({ level: value });
  }
  handleTitleChange=(e) => {
    const v = e.target.value || '';
    this.setState({ title: v });// todo：字数限制什么的emmmm想细了真是麻烦了，后面再完善好了
  }
  handleCancel=() => {
    this.props.closeModal();
    this.initState();
  }
  handleOk=() => {
    this.state.title = myTrim(this.state.title);
    if (this.state.title === '') {
      this.setState({ showAlert: true });// 好像emm就只有一个必填
      return;
    }
    this.setState({ showAlert: false });
    const { ...params } = this.state;
    params.start = params.startRightNow;
    this.props.createDataAsync(params, () => (this.initState()));
  }
  closeAlert =() => {
    this.setState({ showAlert: false });
  }
  initState=() => {
    this.setState({
      des: '',
      level: 0,
      startRightNow: false,
      title: '',
      showAlert: false,
    });
  }
  render() {
    const visible = this.props.visible;
    const { des, title, startRightNow, level, showAlert } = this.state;
    return (
      <Modal
        visible={visible}
        mask
        title="新增PLAN"
        onOk={this.handleOk}
        okText="新建"
        onCancel={this.handleCancel}
        cancelText="取消"
      >
        {showAlert ? <Alert message="计划名称不能为空" type="error" closable onClose={this.closeAlert} /> : ''}
        <MyRow type="flex" justify="center" align="middle">
          <Col span={4} >计划名称</Col>
          <Col span={20} >
            <Input value={title} onChange={this.handleTitleChange} />
          </Col>
        </MyRow>
        <MyRow type="flex" justify="center" align="middle">
          <Col span={4} >优&ensp;先&ensp;级</Col>
          <Col span={20} >
            <LevelSelector value={level} onChange={this.handleLevelChange}></LevelSelector>
          </Col>
        </MyRow>
        <MyRow>
          <Col span={4} >描&emsp;&emsp;述</Col>
          <Col span={20} >
            <TextArea autosize={{ minRows: 5 }} onChange={this.onTyping} onKeyDown={this.onTyping} onKeyUp={this.onTyping} value={des} />
            <PP>还可以输入 {500 - des.length} 字</PP>
          </Col>
        </MyRow>
        <MyRow>
          <Checkbox checked={startRightNow} onChange={this.onChangeCheckbox}>立即执行</Checkbox>
        </MyRow>
      </Modal>
    );
  }
}

NewPlanModal.propTypes = {
  visible: PropTypes.bool,
  closeModal: PropTypes.func,
  createDataAsync: PropTypes.func,
};

function mapStateToProps(state) {
  return {
    visible: getModalVisibility(state),
  };
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators({ closeModal, createDataAsync }, dispatch);
}

const withConnect = connect(mapStateToProps, mapDispatchToProps);

const withSaga = injectSaga({ key: 'plans/watchCreateDataAsync', saga: watchCreateDataAsync });

export default compose(
  withSaga,
  withConnect,
)(NewPlanModal);
