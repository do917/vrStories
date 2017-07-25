import React from 'react';
import VRStories from '../src/components/VRStories';
import VRProfile from '../src/components/VRProfile';
import { shallow, mount, render } from 'enzyme';
import sinon from 'sinon';


import mockData from './mockTestData.js';

  

describe('<VRStories />', () => {
  let wrapper;

  beforeEach(() => {
    // sinon.spy(VRStories.prototype, 'componentWillMount');
    wrapper = shallow(
      <VRStories 
        user={mockData.user}
        friends={mockData.friends}
        autoPlayNext={false}
        autoPlayStart={false}
        splashScreen={'https://thumb1.shutterstock.com/display_pic_with_logo/1589666/318049859/stock-vector-phone-isolated-flat-web-mobile-icon-vector-sign-symbol-button-element-silhouette-318049859.jpg'}
        assetsCallback={() => { return; } }
      />
    );
  });

  describe('upon initialization', () => {
    it('should have multiple friends in props when friend data is provided', () => {
      // console.log('aaa', wrapper)
      expect(wrapper.state().friends.length).toBeGreaterThan(1);
    });

    it('removing friends from state.friends who do not have at least one story', () => {
      expect(wrapper.state().friends.length).toBe(5);
    });

    describe('when autoPlayStart is false', () => {
      it('should show splashScreen', () => {
        expect(wrapper.state().currentStory.id).toBe(-2);
        expect(wrapper.state().currentStory.index).toBe(-2);
      });
    });

    describe('when autoPlayStart is true', () => {
      it('should play first story of friends', () => {
        wrapper.setState({ autoPlayStart: true });
        expect(wrapper.instance().state.currentStory.id).toBe(0);
        expect(wrapper.instance().state.currentStory.index).toBe(0);
      });
    });

    describe('setting key and index to each story', () => { 
      it('should apply a key and index to each friend\'s story', () => {
        wrapper.instance().state.friends.forEach(friend => {
          friend.stories.forEach(story => {
            expect(story).toHaveProperty('id');
            expect(story).toHaveProperty('index');
          });
        });
      });

      it('should apply key and index to each user\'s story', () => {
        wrapper.instance().state.user.stories.forEach(story => {
          expect(story).toHaveProperty('id');
          expect(story).toHaveProperty('index');
        });
      });
    });
  });

  // describe('hover and click listeners', () => {
  //   it('should toggle state.inEntity when mouse enters', () => {
  //     console.log('aa', wrapper.find('VRProfile'));
  //   });

  // });

  describe('stories logic', () => {
    describe('when no story is playing', () => {
      describe('when user is clicked', () => {
        it('should play the user first story', () => {
          wrapper.instance().onFriendClick(wrapper.state().friends[0]);
          expect(wrapper.state().currentStory).toBe(wrapper.state().friends[0]);
        });
      });

      describe('when scene is clicked', () => {

      });
    });


    describe('handling next story event when a story is currently playing', () => {
      describe('when a next story of the currently playing friend is available', () => {

      });

      describe('when a next story of the currently playing friend is not available and autoPlayNext is true', () => {

      });

      describe('when a next story of the currently playing friend is not available and autoPlayNext is false', () => {

      });
    });
  });
});


// describe('<VRProfile />', () => {
//   let wrapper;

//   beforeEach(() => {
//     wrapper = mount(
//       <VRStories 
//         user={mockData.user}
//         friends={mockData.friends}
//         autoPlayNext={false}
//         autoPlayStart={false}
//         splashScreen={'https://thumb1.shutterstock.com/display_pic_with_logo/1589666/318049859/stock-vector-phone-isolated-flat-web-mobile-icon-vector-sign-symbol-button-element-silhouette-318049859.jpg'}
//         assetsCallback={() => console.log('')}
//       />
//     );
//   });

//   it('contains profile components', () => {
//     expect(wrapper.contains(<Profile />)).to.equal(true);
//   });
// });