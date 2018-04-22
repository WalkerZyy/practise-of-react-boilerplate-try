import React from 'react';
import styled from 'styled-components';
import PropTypes from 'prop-types';
import { screen } from 'containers/App/styleConstants';
import WrappedLoginForm from './Form';

const Mask = styled.div`
  position:fixed;
  height:100%;
  width:100%;
  background:rgba(0,0,0,0.2);
  z-index:5000;
`;
// mark才发现style-component里前面一个样式错了，会阻断后面的样式编译，导致木有效果。
const LoginBox = styled.div`
  position:absolute;
  top: 0;right: 0;left: 0;bottom: 0;
  margin:auto;
  box-sizing:border-box;
  padding:20px 10px 10px 20px;
  background-color:#fafafa;
  box-shadow:0 0 2px #000;
  border-radius:10px;z-index:5001;
  @media only screen and (max-width: ${screen.xs}) {
     width:280px;height:300px;
  }
  @media only screen and (min-width: ${screen.xs}) {
    width: 320px;height:300px;
  }
  @media only screen and (min-width: ${screen.sm}) {
      width: 400px;height:320px;
  }
`;

class LoginContainer extends React.Component {
  constructor() {
    super();
    this.hide = this.hide.bind(this);
    this.prevent = this.prevent.bind(this);
  }
  hide() {
    this.props.hideFun();
  }
  prevent(e) {
    e.nativeEvent.stopImmediatePropagation();// 阻止“合成”事件与最外层document上的事件间的冒泡
    e.stopPropagation();// 阻止合成事件间的冒泡
  }
  render() {
    let className = 'hidden';
    if (this.props.visible) {
      className = '';
    }
    let content;
    if (this.props.noMask) {
      content = (<LoginBox onClick={this.prevent}>
        <WrappedLoginForm noMask={this.props.noMask} ></WrappedLoginForm>
      </LoginBox>);
    } else {
      content = (<Mask onClick={this.hide} className={className}>
        <LoginBox onClick={this.prevent}>
          <WrappedLoginForm></WrappedLoginForm>
        </LoginBox>
      </Mask>);
    }
    return content;
  }
}

LoginContainer.propTypes = {
  visible: PropTypes.bool,
  hideFun: PropTypes.func,
  noMask: PropTypes.bool,
};

export default LoginContainer;
