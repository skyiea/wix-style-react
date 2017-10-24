import React from 'react';

import story from '../utils/Components/Story';

import Component from '../../src/Search';
import source from '!raw-loader!wix-style-react/Search/Search';
import readmeTestkit from '../../src/Search/README.TESTKIT.md';

import {
  category,
  storyName,
  options,
  dataHook
} from './SearchStory.helpers';

const Search = props => (
  <div
    style={{
      width: 200  // ATM Input's clear-button expands input container, which causes width-jump effect, thus need to limit
    }}
    >
    <Component
      {...props}
      dataHook={dataHook}
      />
  </div>
);

story({
  category,
  storyName,
  name: 'Search',
  source,
  readmeTestkit,
  component: Search,
  componentProps: setState => ({
    options,
    value: '',
    onChange(e) {
      setState({value: e.target.value});
    },
    onSelect(option) {
      setState({value: option.value});
    }
  })
});
