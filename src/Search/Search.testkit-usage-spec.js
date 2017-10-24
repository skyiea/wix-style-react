// Example used in Testkit README
import React from 'react';
import ReactTestUtils from 'react-dom/test-utils';
import {mount} from 'enzyme';

import {searchTestkitFactory} from '../../testkit';
import {searchTestkitFactory as enzymeSearchTestkitFactory} from '../../testkit/enzyme';

import Search from './Search';

const options = [
  'The quick',
  'brown',
  'fox',
  'jumps over',
  'the lazy',
  'dog'
].map((value, index) => ({id: index, value}));

describe('Example of Search testkits usage', () => {
  describe('ReactTestUtils testkit', () => {
    it('should do search when text was entered', () => {
      const div = document.createElement('div');
      const dataHook = 'myDataHook';
      const wrapper = div.appendChild(ReactTestUtils.renderIntoDocument(
        <div>
          <Search
            dataHook={dataHook}
            options={options}
            />
        </div>
      ));
      const testkit = searchTestkitFactory({wrapper, dataHook});

      testkit.inputDriver.focus();
      testkit.inputDriver.enterText('fox');
      expect(testkit.dropdownLayoutDriver.isShown()).toBe(true);
      expect(testkit.dropdownLayoutDriver.optionsLength()).toBe(1);
    });
  });

  describe('Enzyme testkit', () => {
    it('should do search when text was entered', () => {
      const dataHook = 'myDataHook';
      const wrapper = mount((
        <Search
          dataHook={dataHook}
          options={options}
          />
      ));
      const testkit = enzymeSearchTestkitFactory({wrapper, dataHook});

      testkit.inputDriver.focus();
      testkit.inputDriver.enterText('fox');
      expect(testkit.dropdownLayoutDriver.isShown()).toBe(true);
      expect(testkit.dropdownLayoutDriver.optionsLength()).toBe(1);
    });
  });
});
