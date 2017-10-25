import React from 'react';
import story from '../utils/Components/Story';
import CodeExample from '../utils/Components/CodeExample';

import ExampleStandard from './ExampleStandard';
import ExampleStandardRaw from '!raw-loader!./ExampleStandard';

story({
  category: 'Core',
  componentSrcFolder: 'Label',
  componentProps: {
    children: 'Label text'
  },
  examples: (
    <CodeExample title="Standard" code={ExampleStandardRaw}>
      <ExampleStandard/>
    </CodeExample>
  )
});
