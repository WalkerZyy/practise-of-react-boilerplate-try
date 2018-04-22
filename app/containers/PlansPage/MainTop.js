import React from 'react';
import styled from 'styled-components';
import PropTypes from 'prop-types';
import { Icon, Breadcrumb, Button } from 'antd';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { loadDataAsync } from './actions';


const RightTopBtns = styled.div`
  float:right;display:inline-block;
`;
const MySpan = styled.a`
  cursor:pointer;
`;

// todo:RightTopBtns这里图方便，但是不太好，也会有warning
class MainTop extends React.PureComponent {
  refresh=() => {
    if (this.props.loadDataAsync) {
      this.props.loadDataAsync(); // todo:这里后面看看会不会是本地太快了，需不需要加什么提示
    }
  }
  newPlan=() => {
    if (this.props.onNewPlan) {
      this.props.onNewPlan();
    }
  }
  render() {
    return (
      <Breadcrumb style={{ margin: '16px 0' }}>
        <RightTopBtns>
          <MySpan onClick={this.refresh}><Icon type="sync" />刷新</MySpan>&emsp;<Button type="primary" onClick={this.newPlan} >新增</Button>
        </RightTopBtns>
        <Breadcrumb.Item><Link to="/"><Icon type="home" />&ensp;HomePage</Link></Breadcrumb.Item>
        <Breadcrumb.Item>plans</Breadcrumb.Item>
      </Breadcrumb>
    );
  }
}

MainTop.propTypes = {
  loadDataAsync: PropTypes.func,
  onNewPlan: PropTypes.func,
};

function mapDispatchToProps(dispatch) {
  return bindActionCreators({ loadDataAsync }, dispatch);
}

export default connect(null, mapDispatchToProps)(MainTop);
