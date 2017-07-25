import React from 'react';
import VRStories from '../src/components/VRStories';
import { shallow, mount, render } from 'enzyme';

import mockData from './mockTestData.js';

describe('<VRStories />', () => {
  it('should have one user and multiple friends when user data and friend data is provided', () => {
    const wrapper = shallow(
      <VRStories 
        user={mockData.user}
        friends={mockData.friends}
        autoPlayNext={false}
        autoPlayStart={false}
        splashScreen={'https://thumb1.shutterstock.com/display_pic_with_logo/1589666/318049859/stock-vector-phone-isolated-flat-web-mobile-icon-vector-sign-symbol-button-element-silhouette-318049859.jpg'}
        // defaultDuration={}
        assetsCallback={() => console.log('oops')}
      // exitCallback={}
      />
    );
    console.log(wrapper.instance().props.friends.length);
    expect(wrapper.instance().props.friends.length).to.equal(5);
  });
});