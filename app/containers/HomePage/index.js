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
import styled from 'styled-components';
import { Layout } from 'antd';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import PropTypes from 'prop-types';
import { homePageBlockH as hh, screen } from 'containers/App/styleConstants';
import BlockWrap from './BlockWrap';
import HeaderContent from './HeaderContent';
import FooterContent from './FooterContent';
import LoginContainer from '../LoginContainer';
import './style.less';
import { blockList } from './messages';
import * as ActionCreators from './actions';
import { getLoginVisibility, getUserName } from './selectors';

const { Header, Footer, Content } = Layout;

const cnt = blockList.length;

const MyContent = styled(Content)`
   display:flex;
   overflow-y: auto;
   overflow-x: hidden;
   width:100%;
   justify-content: center;
   align-items:center;
   /*
   考虑这个真是.....人道主义了.....大的是按期望只有一排设的，所以不会空行，取个cnt-1好了
    */
   @media only screen and (max-height:${(hh.xlNum * (cnt - 1)) + (15 * (cnt - 1))}px ) and (max-width:${screen.xl}){
     align-items:flex-start;
     padding-top:10px;
   }
   @media only screen and (max-height:${(hh.lgNum * (cnt - 1)) + (15 * (cnt - 1))}px ) and (max-width:${screen.lg}){
     align-items:flex-start;
     padding-top:10px;
   }
   @media only screen and (max-height:${(hh.mdNum * (cnt - 1)) + (15 * (cnt - 1))}px ) and (max-width:${screen.md}){
     align-items:flex-start;
     padding-top:10px;
   }
   @media only screen and (max-height:${(hh.smNum * cnt) + (15 * (cnt - 1))}px ) and (max-width:${screen.sm}){
     align-items:flex-start;
     padding-top:10px;
   }
   @media only screen and (max-height:${(hh.xsNum * cnt) + (15 * (cnt - 1))}px ) and (max-width:${screen.xs}){
     align-items:flex-start;
     padding-top:10px;
   }
`;

class HomePage extends React.Component { // eslint-disable-line react/prefer-stateless-function
  render() {
    const visibility = this.props.loginVisibility;
    const name = this.props.username;
    return (
      <Layout id="HomePage">
        <LoginContainer visible={visibility} hideFun={this.props.hideLoginEntry} ></LoginContainer>
        <Helmet>
          <title>Home主页</title>
          <meta name="description" content="Zyy的home主页" />
        </Helmet>
        <Header>
          <HeaderContent username={name} loginBtnClick={this.props.showLoginEntry} loginoutClick={this.props.resetUserdata} />
        </Header>
        <MyContent className="HomePageContent">
          <BlockWrap />
        </MyContent>
        <Footer>
          <FooterContent></FooterContent>
        </Footer>
      </Layout>
    );
  }
}

HomePage.propTypes = {
  loginVisibility: PropTypes.bool,
  showLoginEntry: PropTypes.func,
  hideLoginEntry: PropTypes.func,
  username: PropTypes.string,
  resetUserdata: PropTypes.func,
};

function mapStateToProps(state) {
  // if (process.env.NODE_ENV === 'development')console.log(state, state.get('homePage')); // state
  // const s = state.get('homePage');
  // return { loginVisibility: s.loginVisibility };
  // 以上注释是错误示范，因为引用没变，所以不会导致react组件改变状态 这某种意义上也是state的用上immutable的原因
  return {
    loginVisibility: getLoginVisibility(state),
    username: getUserName(state),
  };
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators(ActionCreators, dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(HomePage);

