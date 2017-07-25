import React from 'react';
import VRStories from '../src/components/VRStories';
import VRProfile from '../src/components/VRProfile';
import { shallow, mount, render } from 'enzyme';
import sinon from 'sinon';


import mockData from './mockTestData.js';

  

describe('<VRStories />', () => {
  let wrapper, wrapperAutoPlayStart, wrapperAutoPlayNext;

  beforeEach(() => {
    // sinon.spy(VRStories.prototype, 'componentWillMount');
    wrapper = shallow(
      <VRStories 
        user={mockData.user}
        friends={mockData.friends}
        autoPlayNext={false}
        autoPlayStart={false}
        splashScreen={'./abc.jpg'}
        assetsCallback={() => { return; } }
      />
    );

    wrapperAutoPlayStart = shallow(
      <VRStories 
        user={mockData.user}
        friends={mockData.friends}
        autoPlayNext={false}
        autoPlayStart={true}
        splashScreen={'./abc.jpg'}
        assetsCallback={() => { return; } }
      />
    );

    wrapperAutoPlayNext = shallow(
      <VRStories 
        user={mockData.user}
        friends={mockData.friends}
        autoPlayNext={true}
        autoPlayStart={false}
        splashScreen={'./abc.jpg'}
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
        expect(wrapperAutoPlayStart.instance().state.currentStory.id).toBe(0);
        expect(wrapperAutoPlayStart.instance().state.currentStory.index).toBe(0);
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
    describe('handling next story event when no story is currently playing', () => {
      describe('when a user is clicked', () => {
        it('should play the user\'s first story', () => {
          wrapper.instance().onFriendClick(wrapper.state().friends[2]);
          expect(wrapper.state().currentStory).toBe(wrapper.state().friends[2].stories[0]);
        });
      });

      describe('when scene is clicked', () => {
        it('should do nothing and keep it at splash screen', () => {
          expect(wrapper.state().currentStory.id).toBe(-2);
          expect(wrapper.state().currentStory.index).toBe(-2);
        });
      });
    });


    describe('handling next story event when a story is currently playing', () => {
      beforeEach(() => wrapper.instance().onFriendClick(wrapper.state().friends[2]));

      describe('clicking on a friend whos story is currently playing', () => {
        beforeEach(() => wrapper.instance().onFriendClick(wrapper.state().friends[2]));
        
        describe('when autoPlayNext is true', () => {
          beforeEach(() => wrapper.setState({ autoPlayNext: true }));
          
          describe('when next story is available', () => {
            // wrapper.setState({autoPlayNext: true})
            it('should play the next story', () => {
              expect(wrapper.state().currentStory.id).toBe(2);
              expect(wrapper.state().currentStory.index).toBe(1);
            });
          });
          describe('when next story is not available', () => {
            beforeEach(() => {
              wrapper.instance().onFriendClick(wrapper.state().friends[2]);
              // wrapper.instance().onFriendClick(wrapper.state().friends[2]);
            });
            describe('when next friend\'s story is available', () => {
              it('should play the next friend\'s story', () => {
                console.log('checking state', wrapper.state());
                expect(wrapper.state().currentStory.id).toBe(3);
                expect(wrapper.state().currentStory.index).toBe(0);
              });
              // expect(wrapper.state().currentStory.id).toBe(3);

              // expect(wrapper.state().currentStory.index).toBe(0);
            });
            describe('when next friend\'s story is not available', () => {

            });
          });
        });

        describe('when autoPlayNext is false', () => {
          describe('when next story is available', () => {
            it('should play the next story', () => {

            });
          });

          describe('when next story is not available', () => {
            it('should go back to splash screen', () => {

            });
          });
        });

      });

      describe('clicking on another friend whos story isn\'t playing', () => {

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