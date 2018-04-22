/*
 * HomePage
 *
 * This is the first thing users see of our App, at the '/' route
 *
 * NOTE: while this component should technically be a stateless functional
 * component (SFC), hot reloading does not currently support SFCs. If hot
 * reloading is not a necessity for you then you can refactor it and remove
 * the linting exception.
 */
import React from 'react';
import { Helmet } from 'react-helmet';
import { Layout } from 'antd';
import { connect } from 'react-redux';
import { compose } from 'redux';
import PropTypes from 'prop-types';
import { push } from 'react-router-redux';

import MainTop from './MainTop';
import LeftSlider from './LeftSlider';
import PlanTable from './PlanTable';
import NewPlanModal from './NewPlanModal';

import { getUserName, getToken } from '../HomePage/selectors';
import injectReducer from '../../utils/injectReducer';
import reducer from './reducer';
import { openModal } from './actions';
import '../../components/tablecells/style.less';

const { Content } = Layout;

// 暂时不考虑太多了的分页和优化的情况，嘛~一时间也没那么多plan嘛

class PlansPage extends React.Component {
  componentWillMount() {
    if (!(this.props.token && this.props.username)) {
      if (process.env.NODE_ENV === 'development')console.log('没有token，需要登录');
      this.props.needLogin();
    }
  }
  render() {
    return (
      <Layout id="PlansPage">
        <Helmet>
          <title>Plans</title>
        </Helmet>
        <Layout style={{ minHeight: '100vh' }}>
          <NewPlanModal></NewPlanModal>
          <LeftSlider />
          <Layout>
            <Content style={{ margin: '0 16px' }}>
              <MainTop onNewPlan={this.props.openModal}></MainTop>
              <div style={{ padding: 24, background: '#fff', minHeight: 360 }}>
                <PlanTable></PlanTable>
              </div>
            </Content>
          </Layout>
        </Layout>
      </Layout>
    );
  }
}

PlansPage.propTypes = {
  token: PropTypes.string,
  username: PropTypes.string,
  needLogin: PropTypes.func,
  openModal: PropTypes.func,
};

function mapStateToProps(state) {
  return {
    username: getUserName(state),
    token: getToken(state),
  };
}

function mapDispatchToProps(dispatch) {
  return {
    needLogin: () => { dispatch(push({ pathname: '/login', state: { msg: '需要先登录哟~' } })); },
    openModal: () => { dispatch(openModal()); },
  };
}

const withConnect = connect(mapStateToProps, mapDispatchToProps);
const withReducer = injectReducer({ key: 'plansPage', reducer });

// const withSaga2 = injectSaga({ key: 'watchCreateDataAsync', watchCreateDataAsync });

export default compose(
  withReducer,
  withConnect,
)(PlansPage);
