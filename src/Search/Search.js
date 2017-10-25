import React from 'react';
import PropTypes from 'prop-types';

import InputWithOptions from '../InputWithOptions';
import Search2 from '../Icons/dist/components/Search2';
import WixComponent from '../BaseComponents/WixComponent';

import styles from './Search.scss';

/**
 * Search component with suggestions based on input value listed in dropdown
 */
export default class Search extends WixComponent {
  static displayName = 'Search';

  static propTypes = {
    // TODO: without at least one prop AutoExample fails to parse propTypes. thus temporary solution.
    // get rid of it after fix: https://github.com/wix/wix-style-react/issues/1040
    /** ignore this */
    _tmp: PropTypes.bool,
    ...InputWithOptions.propTypes
  };

  static defaultProps = {
    ...InputWithOptions.defaultProps
  };

  constructor(props) {
    super(props);

    this.state = {
      inputValue: (!this._isControlled && props.defaultValue) || ''
    };
  }

  get _isControlled() {
    return 'value' in this.props && 'onChange' in this.props;
  }

  get _filteredOptions() {
    const {
      options,
      value
    } = this.props;

    const searchText = this._isControlled ? value : this.state.inputValue;

    return options.filter(option => (searchText && searchText.length) ?
      new RegExp(searchText.trim(), 'i').test(option.value) :
      true
    );
  }

  _onChange = e => {
    if (this._isControlled) {
      this.props.onChange(e);
    } else {
      this.setState({
        inputValue: e.target.value
      });
    }
  };

  _onClear = () => {
    const {
      onClear
    } = this.props;

    this.refs.searchInput.input.blur();

    onClear && onClear();
  };

  render() {
    return (
      <InputWithOptions
        placeholder="Search"
        {...this.props}
        ref="searchInput"
        roundInput
        prefix={<div className={styles.leftIcon}><Search2/></div>}
        menuArrow={false}
        clearButton
        closeOnSelect
        showOptionsIfEmptyInput={false}
        options={this._filteredOptions}
        onClear={this._onClear}
        onChange={this._onChange}
        />
    );
  }
}
