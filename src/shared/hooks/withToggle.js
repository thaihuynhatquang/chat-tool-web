import { compose, withStateHandlers } from 'recompose';
import { upperFirst } from 'shared/utils';

const withToggle = (toggleName) => {
  const capitalizeName = upperFirst(toggleName);
  const stateName = `is${capitalizeName}Show`;
  return compose(
    withStateHandlers(
      {
        [stateName]: false,
      },
      {
        [`show${capitalizeName}`]: () => (e) => {
          e.preventDefault();
          return true;
        },
        [`hide${capitalizeName}`]: () => (e) => {
          e.preventDefault();
          return false;
        },
        [`toggle${capitalizeName}`]: (state) => (e) => {
          e.preventDefault();
          return {
            [stateName]: !state[stateName],
          };
        },
      },
    ),
  );
};

export default withToggle;
