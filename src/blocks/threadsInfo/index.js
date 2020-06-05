import { connect } from 'react-redux';
import { branch, compose, renderNothing, withProps, withState } from 'recompose';
import * as storeGetter from 'shared/getEntities';
import ThreadInfo from './components/ThreadInfo';

const mapState = (state) => {
  const { selectedThreadId } = state;
  return {
    selectedThreadId,
    thread: storeGetter.getSelectedThread(state),
  };
};

const enhance = compose(
  connect(mapState),
  withState('open', 'setOpen', false),
  branch((props) => !props.selectedThreadId, renderNothing),
  withProps((props) => ({
    activeStaffs: props.thread.usersServing,
    historyStaffs: props.thread.usersHistory.sort((a, b) => {
      if (a.ThreadUsersHistory.updatedAt > b.ThreadUsersHistory.updatedAt) return 1;
      return -1;
    }),
  })),
);

export default enhance(ThreadInfo);
