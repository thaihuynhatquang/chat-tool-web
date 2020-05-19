import React from 'react';
import { branch, renderComponent } from 'recompose';
import Empty from 'shared/components/Empty';

const withEmpty = (contFunc, emptyOptions) =>
  branch(
    contFunc,
    renderComponent((props) => <Empty {...emptyOptions} />),
  );

export default withEmpty;
