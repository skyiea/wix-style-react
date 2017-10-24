import React from 'react';

import searchDriverFactory from './Search.driver';
import Search from './Search';
import {createDriverFactory} from '../test-common';
import {
  isTestkitExists,
  isEnzymeTestkitExists
} from '../../testkit/test-common';
import {searchTestkitFactory} from '../../testkit';
import {searchTestkitFactory as enzymeSearchTestkitFactory} from '../../testkit/enzyme';
import {runInputWithOptionsTest} from '../InputWithOptions/InputWithOptions.spec';
import {makeControlled} from '../../test/utils/utils';

runInputWithOptionsTest(searchDriverFactory);

const options = [
  'The quick',
  'brown',
  'fox',
  'jumps over',
  'the lazy',
  'dog'
].map((value, index) => ({id: index, value}));

const ControlledSearch = makeControlled(Search);

describe('Search', () => {
  const createDriver = createDriverFactory(searchDriverFactory);

  it('should not show search options when focusing empty input', () => {
    const driver = createDriver(
      <Search
        options={options}
        />
    );
    expect(driver.dropdownLayoutDriver.isShown()).toBe(false);
    driver.inputDriver.focus();
    expect(driver.dropdownLayoutDriver.isShown()).toBe(false);
  });

  it('should filter search options if initial input value passed and input focused', () => {
    const driver = createDriver(
      <Search
        options={options}
        value="fox"
        />
    );
    driver.inputDriver.focus();
    expect(driver.dropdownLayoutDriver.optionsLength()).toBe(1);
  });

  it('should not treat spaces around search text as part of query', () => {
    const driver = createDriver(
      <Search
        options={options}
        value="  fox  "
        />
    );

    driver.inputDriver.focus();
    expect(driver.dropdownLayoutDriver.optionsLength()).toBe(1);
  });

  it('should filter search options if initial defaultValue value passed', () => {
    const driver = createDriver(
      <Search
        options={options}
        defaultValue="fox"
        />
    );
    driver.inputDriver.focus();
    expect(driver.dropdownLayoutDriver.optionsLength()).toBe(1);
  });

  it('should render required elements of Search box', () => {
    const driver = createDriver(
      <Search
        options={options}
        />
    );
    expect(driver.inputDriver.hasPrefix()).toBe(true);
    expect(driver.inputDriver.getPlaceholder()).toBe('Search');
    expect(driver.inputDriver.hasMenuArrow()).toBe(false);
  });

  it('should render clear text button if input is not empty', () => {
    const driver = createDriver(
      <Search
        options={options}
        value="fox"
        />
    );
    expect(driver.inputDriver.hasClearButton()).toBe(true);
  });

  it('should unfocus Search after clear button click', () => {
    const driver = createDriver(
      <ControlledSearch
        options={options}
        value="fox"
        />
    );

    driver.inputDriver.clickClear();
    expect(driver.inputDriver.isFocus()).toBe(false);
  });

  it('should collapse search options after clear button click', () => {
    const driver = createDriver(
      <ControlledSearch
        options={options}
        value="fox"
        />
    );

    driver.inputDriver.clickClear();
    expect(driver.dropdownLayoutDriver.isShown()).toBe(false);
  });

  // TODO: enhance Input component
  it.skip('should focus search input if click on magnifying glass', () => {
    const driver = createDriver(
      <Search
        options={options}
        value="fox"
        />
    );

    driver.inputDriver.clickSuffix();
    expect(driver.inputDriver.isFocus()).toBe(true);
  });

  [
    'Controlled',
    'Uncontrolled'
  ].forEach(type => {
    describe(type, () => {
      const SearchComponent = type === 'Controlled' ? ControlledSearch : Search;

      it('should do search when text was entered', () => {
        const driver = createDriver(
          <SearchComponent
            options={options}
            />
        );
        driver.inputDriver.focus();
        driver.inputDriver.enterText('fox');
        expect(driver.dropdownLayoutDriver.optionsLength()).toBe(1);
        driver.inputDriver.clearText();
        driver.inputDriver.enterText('the');
        expect(driver.dropdownLayoutDriver.optionsLength()).toBe(2);
        driver.inputDriver.clearText();
        driver.inputDriver.enterText('');
        expect(driver.dropdownLayoutDriver.optionsLength()).toBe(options.length);
      });

      it('should show no results if nothing was found in options', () => {
        const driver = createDriver(
          <SearchComponent
            options={options}
            />
        );
        driver.inputDriver.focus();
        driver.inputDriver.enterText('option nowhere to be found');
        expect(driver.dropdownLayoutDriver.optionsLength()).toBe(0);
      });

      // setProps creates new component with new properties (instead of just re-rendering, as expected)
      // (thus test won't simulate what is desired; skip it for now)
      it.skip('should react to value property changes', () => {
        const driver = createDriver(
          <SearchComponent
            value="fox"
            options={options}
            />
        );
        driver.inputDriver.focus();
        driver.inputDriver.setProps({value: ''});
        expect(driver.dropdownLayoutDriver.optionsLength()).toBe(options.length);
      });
    });
  });
});

describe('Testkits', () => {
  it('Using ReactTestUtils testkit', () => {
    expect(isTestkitExists(<Search options={options}/>, searchTestkitFactory)).toBe(true);
  });

  it('Using Enzyme testkit', () => {
    expect(isEnzymeTestkitExists(<Search options={options}/>, enzymeSearchTestkitFactory)).toBe(true);
  });
});
