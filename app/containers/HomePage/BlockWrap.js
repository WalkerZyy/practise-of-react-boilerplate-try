import React from 'react';
import styled from 'styled-components';
import { Row, Col } from 'antd';

import Block from './Block';
import { blockList } from './messages';

const RowWrap = styled.div`
  width:100%;position:relative;
  box-sizing:border-box;
  padding-left: 20px; padding-right: 20px;
`;

export default function BlockWrap() {
  const content = blockList.map((item) => (
      /* 这里因为xs指的是小于antd的sm断点——及576px，而sm实际指的是sm到md之间，所以还是不太直观呢 */
    <Col xs={20} sm={12} md={8} key={`item-${item.id}`}><Block {...item} /></Col>
));
  const gutter = { xs: 10, sm: 16, md: 20, lg: 24 };
  return (
    <RowWrap>
      <Row type="flex" gutter={gutter} justify="space-between" >
        {content}
      </Row>
    </RowWrap>
  );
}
