import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import { Input, Icon } from 'antd';
import { planTextAreaMaxCnt } from './constants';

const { TextArea } = Input;

const max = planTextAreaMaxCnt;

const MyTextArea = styled(TextArea)`
  border:none;background-color:transparent!important;
  &:hover{
    border:none!important;background-color:transparent!important;
  }
  &:focus{
    border:none!important;background-color:transparent!important;
  }
`;

class ExpandedRowRender extends React.Component {
  state = {
    defaultValue: this.props.txt,
    value: this.props.txt,
    editable: false,
  }
  componentWillReceiveProps(nextProps) {
    if (nextProps.txt) {
      this.setState({
        defaultValue: nextProps.txt,
        value: nextProps.txt,
      });
    }
  }
  onTyping = (e) => {
    const v = e.target.value || '';
    this.setState({ value: v.substring(0, max) });
  }
  check = () => {
    this.setState({ editable: false });
    if (this.props.onChange) {
      this.props.onChange(this.state.value);
    }
  }
  edit = () => {
    this.setState({ value: this.state.defaultValue });
    this.setState({ editable: true });
  }
  render() {
    const { value, editable, defaultValue } = this.state;
    return (
      <div>
        {
          editable ?
            <div className="editable-row-wrapper">
              <TextArea autosize={{ minRows: 2 }} onChange={this.onTyping} onKeyDown={this.onTyping} onKeyUp={this.onTyping} value={value}></TextArea>
              <Icon
                type="check"
                className="editable-row-icon-check"
                onClick={this.check}
              />
              <p>还可以输入 {500 - value.length} 字</p>
            </div>
            :
            <div className="editable-row-wrapper">
              <MyTextArea readOnly autosize={{ minRows: 2 }} value={defaultValue}></MyTextArea>
              <Icon
                type="edit"
                className="editable-row-icon"
                onClick={this.edit}
              />
            </div>
        }
      </div>
    );
  }
}

ExpandedRowRender.propTypes = {
  onChange: PropTypes.func,
  txt: PropTypes.object,
};

export default ExpandedRowRender;
