import { compose, withStateHandlers } from 'recompose';
import { upperFirst } from 'shared/utils';

const withToggle = (toggleName, toggleByDefault = false) => {
  const capitalizeName = upperFirst(toggleName);
  const stateName = `is${capitalizeName}Show`;
  return compose(
    withStateHandlers(
      {
        [stateName]: toggleByDefault,
      },
      {
        [`show${capitalizeName}`]: () => (e) => {
          e && e.preventDefault();
          return {
            [stateName]: true,
          };
        },
        [`hide${capitalizeName}`]: () => (e) => {
          e && e.preventDefault();
          return {
            [stateName]: false,
          };
        },
        [`toggle${capitalizeName}`]: (state) => (e) => {
          e && e.preventDefault();
          return {
            [stateName]: !state[stateName],
          };
        },
      },
    ),
  );
};

export default withToggle;
