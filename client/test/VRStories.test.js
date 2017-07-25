import React from 'react';
import VRStories from '../src/components/VRStories';
import VRProfile from '../src/components/VRProfile';
import { shallow, mount, render } from 'enzyme';
import sinon from 'sinon';

import mockData from './mockTestData.js';

  

describe('<VRStories />', () => {
  let wrapper, wrapperAutoPlayStart;

  beforeEach(() => {
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

  describe('handling onFriendClick', () => {
    describe('when no story is currently playing', () => {
      describe('when a user is clicked', () => {
        it('should play the user\'s first story', () => {
          wrapper.instance().onFriendClick(wrapper.state().friends[2]);
          expect(wrapper.state().currentStory).toBe(wrapper.state().friends[2].stories[0]);
        });
      });
    });

    describe('when a story is currently playing', () => {
      beforeEach(() => wrapper.instance().onFriendClick(wrapper.state().friends[2]));
      describe('clicking on a friend whos story is currently playing', () => {
        beforeEach(() => wrapper.instance().onFriendClick(wrapper.state().friends[2]));
        describe('when next story is available', () => {
          it('should play the next story', () => {
            expect(wrapper.state().currentStory.id).toBe(2);
            expect(wrapper.state().currentStory.index).toBe(1);
          });
        });
        describe('when next story is not available', () => {
          beforeEach(() => {
            wrapper.instance().onFriendClick(wrapper.state().friends[2]);
            wrapper.instance().onFriendClick(wrapper.state().friends[2]);
          });
          it('should go to the splash screen', () => {
            expect(wrapper.state().currentStory.id).toBe(-2);
            expect(wrapper.state().currentStory.index).toBe(-2);
          });
        });
      });

      describe('clicking on another friend whos story isn\'t playing', () => {
        beforeEach(() => wrapper.instance().onFriendClick(wrapper.state().friends[3]));
        it('should play that clicked friend\'s story', () => {
          expect(wrapper.state().currentStory.id).toBe(3);
          expect(wrapper.state().currentStory.index).toBe(0);
        });
      });
    });
  });

  describe('handling playNext', () => {
    describe('when there is a next story available in currentStories', () => {
      beforeEach(() => {
        wrapper.setState({
          currentStories: mockData.friends[0].stories,
          currentStory: mockData.friends[0].stories[0]
        });
        wrapper.instance().playNext();
      });

      it('should play the next user\'s story', () => {
        expect(wrapper.state().currentStory.id).toBe(0);
        expect(wrapper.state().currentStory.index).toBe(1);
      });
    });

    describe('when there is\'nt a next story available in currentStories', () => {
      beforeEach(() => {
        wrapper.setState({
          currentStories: mockData.friends[0].stories,
          currentStory: mockData.friends[0].stories[2]
        });
        wrapper.instance().playNext();
      });

      describe('when autoPlayNext is false', () => {
        it('should go to the splash screen', () => {
          expect(wrapper.state().currentStory.id).toBe(-2);
          expect(wrapper.state().currentStory.index).toBe(-2);
        });
      });

      describe('when autoPlayNext is true', () => {
        beforeEach(() => {
          wrapper.setState({ 
            currentStories: mockData.friends[0].stories,
            currentStory: mockData.friends[0].stories[2],
            autoPlayNext: true 
          });
          wrapper.instance().playNext();
        });

        it('should play the next friend\'s stories', () => {
          expect(wrapper.state().currentStory.id).toBe(1);
          expect(wrapper.state().currentStory.index).toBe(0);
        });
      });
    });
  });
});