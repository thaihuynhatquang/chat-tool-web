import React from 'react';
import { storiesOf } from '@storybook/react';
import NavLink from './components/NavLink';

const emptyFunction = () => {};

storiesOf('Navigation Link', module).add('nav simple', () => <NavLink changeRoute={emptyFunction} />);
