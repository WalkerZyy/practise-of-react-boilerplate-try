import React from 'react';
import { shallow } from 'enzyme';

import Iconfont from '../index';

const className = 'icon-blogger';

const renderComponent = (props = { className }) => shallow(
  <Iconfont className={props.className}></Iconfont>
);

describe('<Iconfont />', () => {
  it('should render an <i> tag', () => {
    const renderedComponent = renderComponent();
    expect(renderedComponent.is('i')).toBe(true);
  });
  it('should have a class named icon-blogger', () => {
    const renderedComponent = renderComponent();
    expect(renderedComponent.hasClass('icon-blogger')).toBe(true);
  });
});
