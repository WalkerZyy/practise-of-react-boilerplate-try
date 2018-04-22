import React from 'react';
import PropTypes from 'prop-types';
// import styled from 'styled-components';
import { Select } from 'antd';
import './LevelSelector.less';
const Option = Select.Option;

// 用styled-components封装option会有警告，想想算了
const classArr = [
  'level-selector-option-nohurry',
  'level-selector-option-need',
  'level-selector-option-must',
  'level-selector-option-first',
];

class LevelSelector extends React.Component {
  constructor(props) {
    super(props);
    this.handleChange = this.handleChange.bind(this);
  }
  state = {
    value: this.props.value || 0,
  }
  componentWillReceiveProps(nextProps) { // 外部应该大于内部，这样change失败也能变回去，没毛病
    if (nextProps.value !== null) {
      this.setState({
        value: nextProps.value,
      });
    }
  }
  handleChange(value) {
    this.props.onChange(value);
    this.setState({ value });
  }
  render() {
    const value = this.state.value;
    return (
      <Select value={value} className={classArr[value]} style={{ width: 80 }} onChange={this.handleChange}>
        <Option className={classArr[0]} value={0}>不必要</Option>
        <Option className={classArr[1]} value={1}>需要</Option>
        <Option className={classArr[2]} value={2}>必要</Option>
        <Option className={classArr[3]} value={3}>首要</Option>
      </Select>
    );
  }
}

LevelSelector.propTypes = {
  onChange: PropTypes.func,
  value: PropTypes.number,
};

export default LevelSelector;
