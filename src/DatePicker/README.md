# DatePicker

> __NOTE__: at the moment this component requires `moment`

### Localization

The date picker relies on [moment.js internationalization](http://momentjs.com/docs/#/i18n/) to localize its display components. By default, the date picker will use the locale globally set in moment, which is English. Locales can be changed in the following ways:

- **Globally** by calling `moment.locale(lang)`
- **Picker-specific** by providing the `locale` prop

Locales can be further configured in moment with various [customization options](http://momentjs.com/docs/#/customization/).
