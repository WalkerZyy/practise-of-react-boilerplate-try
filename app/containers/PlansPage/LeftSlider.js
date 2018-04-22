import React from 'react';
import PropTypes from 'prop-types';
import { Layout, Menu, Icon } from 'antd';
import { connect } from 'react-redux';

import { collapseSlider, openSlider, setPlanStatus } from './actions';
import { getCollapsed } from './selectors';
import { PLANSTATUS_OBJ } from './constants';

const { Sider } = Layout;

class LeftSlider extends React.PureComponent {
  handleClick = (e) => {
    // console.log('click ', e);
    const key = e.key;
    if (key === '1') {
      this.props.setPlanStatus(PLANSTATUS_OBJ.all);
    } else if (key === '2') {
      this.props.setPlanStatus(PLANSTATUS_OBJ.unstart);
    } else if (key === '3') {
      this.props.setPlanStatus(PLANSTATUS_OBJ.doing);
    } else if (key === '4') {
      this.props.setPlanStatus(PLANSTATUS_OBJ.done);
    }
  }
  render() {
    const collapsed = this.props.collapsed;
    return (
      <Sider
        collapsible
        collapsed={collapsed}
        onCollapse={this.props.toggleSlider}
      >
        <Menu theme="dark" mode="inline" defaultSelectedKeys={['1']} onClick={this.handleClick} >
          <Menu.Item key="1">
            <Icon type="user" />
            <span>全部</span>
          </Menu.Item>
          <Menu.Item key="2">
            <Icon type="video-camera" />
            <span>待开始</span>
          </Menu.Item>
          <Menu.Item key="3">
            <Icon type="upload" />
            <span>进行中</span>
          </Menu.Item>
          <Menu.Item key="4">
            <Icon type="upload" />
            <span>已完成</span>
          </Menu.Item>
        </Menu>
      </Sider>
    );
  }
}

LeftSlider.propTypes = {
  collapsed: PropTypes.bool,
  toggleSlider: PropTypes.func,
  setPlanStatus: PropTypes.func,
};

function mapStateToProps(state) {
  return {
    collapsed: getCollapsed(state),
  };
}

function mapDispatchToProps(dispatch) {
  return {
    toggleSlider: (collapse) => {
      if (collapse) { dispatch(collapseSlider()); } else { dispatch(openSlider()); }
    },
    setPlanStatus: (planStatus) => (dispatch(setPlanStatus(planStatus))),
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(LeftSlider);
