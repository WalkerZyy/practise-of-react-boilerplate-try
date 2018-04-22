import React from 'react';
import { shallow } from 'enzyme';

import HomePage from '../index';
import Block from '../Block';
import { blockList } from '../messages';


describe('<HomePage />', () => {
  it('should render the page message', () => {
    const renderedComponent = shallow(
      <HomePage />
    );
    expect(renderedComponent.contains(
      <Block {...blockList[1]}></Block>,
      <Block {...blockList[2]}></Block>,
      <Block {...blockList[3]}></Block>
    )).toEqual(true);
  });
});
