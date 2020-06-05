import { compose, withHandlers } from 'recompose';
import NavLink from './components/NavLink';

const enhance = compose(
  withHandlers({
    changeRoute: (props) => (route) => () => {
      props.history.push(route);
    },
  }),
);

export default enhance(NavLink);
