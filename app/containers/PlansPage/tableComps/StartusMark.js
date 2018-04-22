import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';

const BlueDiv = styled.div`
   color:#5aa0ee;
`;

const GrayDiv = styled.div`
  color:#cccccc;
`;

class StartusMark extends React.PureComponent {
  render() {
    let coloredDiv = (<div>unstart</div>);
    if (this.props.value === 'doing') {
      coloredDiv = (<BlueDiv>Started</BlueDiv>);
    }
    if (this.props.value === 'done') {
      coloredDiv = (<GrayDiv>Done</GrayDiv>);
    }
    return coloredDiv;
  }
}

StartusMark.propTypes = {
  value: PropTypes.string,
};

export default StartusMark;
