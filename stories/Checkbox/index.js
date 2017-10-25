import React from 'react';
import story from '../utils/Components/Story';
import CodeExample from '../utils/Components/CodeExample';

import ExampleStandard from './ExampleStandard';
import ExampleStandardRaw from '!raw-loader!./ExampleStandard';

import ExampleIndeterminate from './ExampleIndeterminate';
import ExampleIndeterminateRaw from '!raw-loader!./ExampleIndeterminate';

import ExampleRtl from './ExampleRtl';
import ExampleRtlRaw from '!raw-loader!./ExampleRtl';

import ExampleControlled from './ExampleControlled';
import ExampleControlledRaw from '!raw-loader!./ExampleControlled';

story({
  category: 'Core',
  componentSrcFolder: 'Checkbox',
  componentProps: {
    children: 'Some text'
  },
  examples: (
    <div>
      <h1>Usage examples</h1>
      <CodeExample title="Standard" code={ExampleStandardRaw}>
        <ExampleStandard/>
      </CodeExample>
      <CodeExample title="Indeterminate" code={ExampleIndeterminateRaw}>
        <ExampleIndeterminate/>
      </CodeExample>
      <CodeExample title="Rtl" code={ExampleRtlRaw}>
        <ExampleRtl/>
      </CodeExample>
      <CodeExample title="Controlled input" code={ExampleControlledRaw}>
        <ExampleControlled/>
      </CodeExample>
    </div>
  )
});

