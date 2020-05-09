import { configure } from '@storybook/react';
import 'styles';

const req = require.context('../', true, /\.?stories\.js$/);

function loadStories() {
  req.keys().forEach((filename) => req(filename));
}

configure(loadStories, module);
