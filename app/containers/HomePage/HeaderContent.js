import React from 'react';
// import styled from 'styled-components';
import PropTypes from 'prop-types';
import { Row, Col, Button } from 'antd';
import './style.less';

class HeaderContent extends React.PureComponent {
  render() {
    let sayHi; const date = new Date();
    const today = `今天是${date.getFullYear()}-${date.getMonth() + 1}-${date.getDate()} 星期${'日一二三四五六'.charAt(date.getDay())}`;
    if (this.props.username) {
      // className要这样写，不能直接赋字符串，不然由于style-component的原因要被覆盖
      sayHi = (<div className={'right'}>
        <span>HI~{this.props.username}</span>&emsp;<Button onClick={this.props.loginoutClick}>注销</Button>
      </div>);
    } else {
      sayHi = (<div className={'right'}>
        <span>Hello,{today}</span>&emsp;<Button onClick={this.props.loginBtnClick}>登录</Button>
      </div>);
    }
    return (
      <Row className={'headerContent'} gutter={16}>
        <Col sm={12} xs={0}>
          <div className={'title'}>HomePage</div>
        </Col>
        <Col sm={12} xs={24}>
          { sayHi }
        </Col>
      </Row>
    );
  }
}

HeaderContent.propTypes = {
  username: PropTypes.string,
  loginBtnClick: PropTypes.func,
  loginoutClick: PropTypes.func,
};


export default HeaderContent;
