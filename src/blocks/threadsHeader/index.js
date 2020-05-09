import ThreadHeader from './components/ThreadHeader';
import { connect } from 'react-redux';
import { compose } from 'recompose';

const mapProps = (state) => {
  const {
    threads: {
      totalCount,
      filterBy: { status },
    },
  } = state;

  return {
    count: totalCount,
    status,
  };
};

const enchance = compose(connect(mapProps));
export default enchance(ThreadHeader);
