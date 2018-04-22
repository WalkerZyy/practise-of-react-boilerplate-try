import React from 'react';
import PropTypes from 'prop-types';
import { Button } from 'antd';

class BtnOrDate extends React.PureComponent {
  render() {
    const { value, condition, hasCondition } = this.props;
    if (!value) {
      if (hasCondition) {
        // condition是先决条件，比如显示结束button的条件是已经开始
        if (condition) {
          return <Button type="primary" ghost onClick={this.props.onBtnClick}>{this.props.children}</Button>;
        }
        return <div></div>;
      }
      return <Button type="primary" ghost onClick={this.props.onBtnClick}>{this.props.children}</Button>;
    }
    return <div>{value}</div>;
  }
}

BtnOrDate.propTypes = {
  children: PropTypes.any,
  onBtnClick: PropTypes.func,
  value: PropTypes.string,
  condition: PropTypes.string,
  hasCondition: PropTypes.bool,
};

export default BtnOrDate;
