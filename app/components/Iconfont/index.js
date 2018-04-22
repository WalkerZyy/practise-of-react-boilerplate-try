// 从阿里的Iconfont来的Icon
import React from 'react';
import PropTypes from 'prop-types';
import Icon from './Icon';
import './style.less';

function Iconfont(props) {
  return (
    // className原来不加也是可以的么
    <Icon className={props.className}>
    </Icon>
  );
}

Iconfont.propTypes = {
  className: PropTypes.string.isRequired,
};

export default Iconfont;
