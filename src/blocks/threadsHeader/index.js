import ThreadHeader from './components/ThreadHeader';
import { connect } from 'react-redux';
import { compose } from 'recompose';

const mapState = (state) => {
  const {
    threads: { totalCount, filterBy },
  } = state;

  return {
    count: totalCount,
    filterBy,
  };
};

const enhance = compose(connect(mapState));
export default enhance(ThreadHeader);
