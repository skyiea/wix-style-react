import {
  browser
} from 'protractor';
import eyes from 'eyes.it';

import {
  searchTestkitFactory,
  getStoryUrl,
  waitForVisibilityOf
} from '../../testkit/protractor';

import {
  category,
  storyName,
  options,
  dataHook
} from '../../stories/Search/SearchStory.helpers';

describe('Search', () => {
  const storyUrl = getStoryUrl(category, storyName);
  let driver;

  beforeEach(done => {
    driver = searchTestkitFactory({dataHook});
    browser.get(storyUrl);
    waitForVisibilityOf(driver.element(), 'Can not find Search').then(done);
  });

  eyes.it('should filter search options by input', () => {
    expect(driver.getSearchDropdown().isDisplayed()).toBe(false);
    driver.clickOnInput();
    driver.enterText(options[2].value);
    expect(driver.getSearchDropdown().isDisplayed()).toBe(true);
    expect(driver.getSearchOptionsCount()).toBe(1);
    expect(driver.getSearchOptionAt(0)).toBe('fox');
  });

  eyes.it('should choose one of search options', () => {
    driver.clickOnInput();
    driver.enterText('the');
    driver.clickSearchOptionAt(0);
    expect(driver.getText()).toBe(options[0].value);
  });

  eyes.it('should clear input and show all search options after clear button click', () => {
    driver.clickOnInput();
    driver.enterText('fox');
    expect(driver.hasClearButton()).toBe(true);
    driver.clickClear();
    expect(driver.getSearchDropdown().isDisplayed()).toBe(false);
    expect(driver.getText()).toBe('');
  });
});
