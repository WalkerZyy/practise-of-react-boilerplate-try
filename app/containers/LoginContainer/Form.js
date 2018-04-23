import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import { compose, bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { Form, Icon, Input, Button } from 'antd';
// import { createFormField } from 'rc-form';

// import injectReducer from 'utils/injectReducer';
import injectSaga from 'utils/injectSaga';
// import { screen } from 'containers/App/styleConstants';
import { hideLoginEntry } from 'containers/HomePage/actions';
import { doLogin } from './actions';
// import reducer from './reducer';
import saga from './saga';

const FormItem = Form.Item;

const LoginButton = styled(Button)`
  width:100%;
`;

// Form表单创建
class LoginForm extends React.PureComponent {
  handleSubmit = (e) => {
    e.preventDefault();
    this.props.form.validateFields((err, values) => {
      if (!err) {
        // if (process.env.NODE_ENV === 'development')console.log('Received values of form: ', values, this.props);
        const { ...params } = values;
        if (this.props.noMask) {
          params.noMask = true;
        }
        this.props.doLogin(params);
      }
    });
  }
  cancel = () => {
    this.props.form.resetFields();
    this.props.hideLoginEntry();
  }
  render() {
    const { getFieldDecorator } = this.props.form;
    // if (process.env.NODE_ENV === 'development')console.log(this.props);
    return (
      <Form onSubmit={this.handleSubmit}>
        <FormItem>
          {getFieldDecorator('username', {
            rules: [{ required: true, message: '请输入用户名!' }],
          })(
            <Input size={'large'} prefix={<Icon type="user" style={{ color: 'rgba(0,0,0,.25)' }} />} placeholder="用户名" />
          )}
        </FormItem>
        <FormItem>
          {getFieldDecorator('password', {
            rules: [{ required: true, message: '请输入密码!' }],
          })(
            <Input size={'large'} prefix={<Icon type="lock" style={{ color: 'rgba(0,0,0,.25)' }} />} type="password" placeholder="密  码" />
          )}
        </FormItem>
        <FormItem>
          <LoginButton type="primary" htmlType="submit">
          登录
          </LoginButton>
        </FormItem>
        <FormItem>
          <LoginButton type="default" onClick={this.cancel} >
            取消
          </LoginButton>
        </FormItem>
        <div>
          <p>其它内容描述:</p>
          <p>这里提供guest账号</p>
          <p>用户名：guest   密码：12345678</p>
        </div>
      </Form>
    );
  }
}
LoginForm.propTypes = {
  form: PropTypes.any,
  doLogin: PropTypes.func,
  hideLoginEntry: PropTypes.func,
  noMask: PropTypes.bool,
};

function mapDispatchToProps(dispatch) {
  return bindActionCreators({ hideLoginEntry, doLogin }, dispatch);
}

const WrappedLoginForm = Form.create()(LoginForm);
// export default WrappedLoginForm;
const withConnect = connect(null, mapDispatchToProps);
const withSaga = injectSaga({ key: 'login', saga });

export default compose(
  withSaga,
  withConnect,
)(WrappedLoginForm);
