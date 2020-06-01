import React, { Fragment } from 'react';
import { lifecycle } from 'recompose';

const ErrorBoundary = (props) => {
  return <Fragment>{props.children}</Fragment>;
};

export default lifecycle({
  componentDidCatch(error, info) {
    this.props.onError(error, info);
  },
})(ErrorBoundary);
