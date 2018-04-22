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
import { Layout, Icon, message } from 'antd';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import LoginContainer from 'containers/LoginContainer';

const { Header } = Layout;

const MyLink = styled(Link)`
  font-size: 20px;
  color:white;
`;

class LoginPage extends React.Component { // eslint-disable-line react/prefer-stateless-function
  componentDidMount() {
    if (process.env.NODE_ENV === 'development')console.log(this.props.location);
    if (this.props.location.state && this.props.location.state.msg) {
      message.info(this.props.location.state.msg);
    }
  }
  render() {
    return (
      <Layout id="LoginPage">
        <Helmet>
          <title>登录</title>
        </Helmet>
        <Header>
          <MyLink to="/"><Icon type="home" />&ensp;HomePage</MyLink>
        </Header>
        <Layout>
          <LoginContainer noMask></LoginContainer>
        </Layout>
      </Layout>
    );
  }
}

LoginPage.propTypes = {
  location: PropTypes.any,
};

export default connect()(LoginPage);

