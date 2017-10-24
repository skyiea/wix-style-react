// Example used in Testkit README
import {
    searchTestkitFactory,
    waitForVisibilityOf
} from '../../testkit/protractor';
import eyes from 'eyes.it';

describe('Example of Search Protractor testkit usage', () => {
  eyes.it('should show menu on trigger click', () => {
    const testkit = searchTestkitFactory({dataHook: 'myDataHook'});

    waitForVisibilityOf(testkit.element(), 'Can not find Search element').then(() => {
      testkit.clickOnInput();
      testkit.enterText('fox');

      waitForVisibilityOf(testkit.getSearchDropdown(), 'Can not find Search dropdown').then(() => {
        expect(testkit.getSearchOptionsCount()).toEqual(1);
      });
    });
  });
});
