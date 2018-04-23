import React from 'react';
import styled from 'styled-components';
import './style.less';

const Content = styled.div`   
  text-align:center;word-wrap:break-word;
`;

const FooterContent = function () {
  const github = 'https://github.com/WalkerZyy/practise-of-react-boilerplate-try';
  return (
    <Content href={github} target="_blank">
      <a>github地址: {github}</a>
    </Content>
  );
};

export default FooterContent;
