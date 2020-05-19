import ThreadHeader from './components/ThreadHeader';
import { connect } from 'react-redux';
import { compose } from 'recompose';

const mapState = (state) => {
  const { totalThreadsCount, filterThreadsBy } = state;

  return {
    count: totalThreadsCount,
    filterBy: filterThreadsBy,
  };
};

const enhance = compose(connect(mapState));
export default enhance(ThreadHeader);
