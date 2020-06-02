import requireContext from 'require-context.macro';
import { configure } from '@storybook/react';
import 'styles';

const req = requireContext('../', true, /\.?stories\.js$/);

function loadStories() {
  req.keys().forEach((filename) => req(filename));
}

configure(loadStories, module);
