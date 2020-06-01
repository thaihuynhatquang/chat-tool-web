import React from 'react';
import { storiesOf } from '@storybook/react';

import ErrorBoundary from './ErrorBoundary';

const Wrapper = (props) => {
  return (
    <div>
      Hello world
      {props.children}
    </div>
  );
};
const ErrorComponent = (props) => {
  throw new Error('Testing Error');
};

storiesOf('ErrorBoundary', module).add('image with error source', () => (
  <ErrorBoundary onError={() => alert('Error handler function')}>
    <Wrapper>
      <ErrorComponent />
    </Wrapper>
  </ErrorBoundary>
));
