import React from 'react';
import { branch, renderComponent } from 'recompose';
import Spinner from 'shared/components/Spinner';

const withLoading = (contFunc, spinnerOptions) =>
  branch(
    contFunc,
    renderComponent((props) => <Spinner {...spinnerOptions} />),
  );

export default withLoading;
