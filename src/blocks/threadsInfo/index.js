import { compose, withState, branch, renderNothing } from 'recompose';
import ThreadInfo from './components/ThreadInfo';
import { withFetcher, withLoading } from 'shared/hooks';
import { fetchActiveStaffs, fetchHistoryStaffs } from './services';
import * as storeGetter from 'shared/getEntities';
import { connect } from 'react-redux';

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
  withState('activeStaffs', 'setActiveStaffs', []),
  withState('historyStaffs', 'setHistoryStaffs', []),
  branch((props) => !props.selectedThreadId, renderNothing),
  withFetcher(
    'staffs',
    async (props) => {
      const [activeStaffs, historyStaffs] = await Promise.all([
        fetchActiveStaffs(props.selectedThreadId),
        fetchHistoryStaffs(props.selectedThreadId),
      ]);
      props.setActiveStaffs(activeStaffs.data);
      props.setHistoryStaffs(historyStaffs.data);
    },
    {
      fetchOnPropsChange: ['selectedThreadId'],
    },
  ),
  withLoading((props) => props.staffsFetcher.isLoading, { size: 2 }),
);

export default enhance(ThreadInfo);
