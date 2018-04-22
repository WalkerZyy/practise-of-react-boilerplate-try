import React from 'react';
import styled from 'styled-components';
import Iconfont from 'components/Iconfont';
import PropTypes from 'prop-types';
import { Col, Row } from 'antd';
import { Link } from 'react-router-dom';

import { screen, homePageBlockH } from 'containers/App/styleConstants';

// 目前也就三个
const HomeBlockDiv = styled.div`
  display: block;
  overflow: hidden;
  position: relative;
  border:1px solid #999999;
  border-radius:10px;
  background-color:white;height:100%;
  box-shadow: 0px 0px 5px #888888;
  margin:auto;margin-bottom:15px;
  @media only screen and (max-width: ${screen.xs}) {
     width:280px;height:${homePageBlockH.xxs};
  }
  @media only screen and (min-width: ${screen.xs}) {
    width: 400px;height:${homePageBlockH.xs};
  }
  @media only screen and (min-width: ${screen.sm}) {
      width: 320px;height:${homePageBlockH.sm};
    }/* 到此为止都期望的是一排一个 */
  @media only screen and (min-width: ${screen.md}) {
      width: 340px;height: ${homePageBlockH.md};
    }/* 到此为止都期望的是一排两个 */
  @media only screen and (min-width: ${screen.lg}) {
      width: 280px; height: ${homePageBlockH.lg};
    }
  @media only screen and (min-width: ${screen.xl}) {
      width: 320px; height: ${homePageBlockH.xl};
    }
`;

const FirstRow = styled(Row)`
    @media only screen and (max-width: ${screen.xs}) {
     height:${homePageBlockH.xxsTitle}px;
  }
  @media only screen and (min-width: ${screen.xs}) {
    height:${homePageBlockH.xsTitle}px;
  }
  @media only screen and (min-width: ${screen.sm}) {
      height:${homePageBlockH.smTitle}px;
    }
  @media only screen and (min-width: ${screen.md}) {
      height: ${homePageBlockH.mdTitle}px;
    }
  @media only screen and (min-width: ${screen.lg}) {
     height: ${homePageBlockH.lgTitle}px;
    }
  @media only screen and (min-width: ${screen.xl}) {
      height: ${homePageBlockH.xlTitle}px;
    }
`;

const IconCol = styled(Col)`
  text-align:center;
`;
const ColIconFont = styled(Iconfont)`
  @media only screen and (max-width: ${screen.xs}) {
     font-size:${homePageBlockH.xxsTitle - 20}px;
  }
  @media only screen and (min-width: ${screen.xs}) {
    font-size:${homePageBlockH.xsTitle - 20}px;
  }
  @media only screen and (min-width: ${screen.sm}) {
      font-size:${homePageBlockH.smTitle - 20}px;
    }
  @media only screen and (min-width: ${screen.md}) {
      font-size: ${homePageBlockH.mdTitle - 20}px;
    }
  @media only screen and (min-width: ${screen.lg}) {
     font-size: ${homePageBlockH.lgTitle - 20}px;
    }
  @media only screen and (min-width: ${screen.xl}) {
      font-size: ${homePageBlockH.xlTitle - 20}px;
    }
`;
// 貌似这个命名字数也溢不出，就暂时不管了
const TitleCol = styled(Col)`
  overflow:hidden;
    @media only screen and (max-width: ${screen.xs}) {
     font-size:16px;
  }
  @media only screen and (min-width: ${screen.xs}) {
    font-size:20px;
  }
  @media only screen and (min-width: ${screen.sm}) {
      font-size:24px;
    }
  @media only screen and (min-width: ${screen.md}) {
      font-size: 28px;
    }
  @media only screen and (min-width: ${screen.lg}) {
     font-size: 32px;
    }
  @media only screen and (min-width: ${screen.xl}) {
      font-size: 36px;
    }
`;
// 第二行
const SecondRow = styled(Row)`
  padding-left:10px;
  padding-right:10px;
  padding-bottom:10px;
  box-sizing:border-box;
  position:relative;
  overflow: hidden;
  @media only screen and (max-width: ${screen.xs}) {
     height:${homePageBlockH.xxsNum - homePageBlockH.xxsTitle}px;
  }
  @media only screen and (min-width: ${screen.xs}) {
    height:${homePageBlockH.xsNum - homePageBlockH.xsTitle}px;
  }
  @media only screen and (min-width: ${screen.sm}) {
      height:${homePageBlockH.smNum - homePageBlockH.smTitle}px;
    }
  @media only screen and (min-width: ${screen.md}) {
      height: ${homePageBlockH.mdNum - homePageBlockH.mdTitle}px;
    }
  @media only screen and (min-width: ${screen.lg}) {
     height: ${homePageBlockH.lgNum - homePageBlockH.lgTitle}px;
    }
  @media only screen and (min-width: ${screen.xl}) {
      height: ${homePageBlockH.xlNum - homePageBlockH.xlTitle}px;
    }
`;
const SecondRowP = styled.p`
  word-wrap:break-word;
`;

const Block = function (props) {
  const first = (
    <FirstRow align="middle" type="flex">
      <IconCol span={8}>
        <ColIconFont className={props.iconClass}></ColIconFont>
      </IconCol>
      <TitleCol span={16}>
        <p>{props.title}</p>
      </TitleCol>
    </FirstRow>
    );
  const second = (
    <SecondRow align="top">
      <SecondRowP>{props.des}</SecondRowP>
    </SecondRow>
  );
  let content;
  if (props.link) {
    content = (
      <HomeBlockDiv>
        <Link to={props.link}>
          {first}
          {second}
        </Link>
      </HomeBlockDiv>
    );
  } else {
    content = (
      <HomeBlockDiv>
        {first}
        {second}
      </HomeBlockDiv>
  );
  }
  return content;
};

Block.propTypes = {
  iconClass: PropTypes.string,
  title: PropTypes.string,
  des: PropTypes.string,
  link: PropTypes.string,
};

export default Block;
