import { THREAD_STATUS_DONE, THREAD_STATUS_PROCESSING, THREAD_STATUS_SPAM } from 'shared/constants';
import { connect } from 'react-redux';
import { branch, compose, mapProps, renameProps, renderNothing, withHandlers } from 'recompose';
import * as storeGetter from 'shared/getEntities';
import { withToggle } from 'shared/hooks';
import Header from './components/Header';
import * as services from './services';

const mapState = (state) => {
  const thread = storeGetter.getSelectedThread(state);
  const me = storeGetter.getMe(state);
  return {
    me,
    selectedThread: thread,
    channel: thread ? storeGetter.getChannelById(state, thread.channelId) : null,
  };
};

const enhance = compose(
  connect(mapState, null),
  branch((props) => !props.selectedThread || !props.selectedThread.id, renderNothing),
  withHandlers({
    changeThreadStatus: (props) => (status) => ({ cause }) => (e) => {
      const {
        selectedThread: { id: threadId },
      } = props;
      return services.updateThreadStatus({
        threadId,
        status,
        cause,
      }); // Will handle action in socket
    },
  }),
  withHandlers({
    changeThreadStatusToSpam: (props) => props.changeThreadStatus(THREAD_STATUS_SPAM),
    changeThreadStatusToProcessing: (props) => props.changeThreadStatus(THREAD_STATUS_PROCESSING)({}),
    changeThreadStatusToDone: (props) => props.changeThreadStatus(THREAD_STATUS_DONE),
  }),
  withToggle('transferThreadModal'),
  mapProps(({ changeThreadStatus, updateThreadStatusSucceed, ...rest }) => rest),
  renameProps({
    selectedThread: 'thread',
    changeThreadStatusToSpam: 'onClickSpam',
    changeThreadStatusToProcessing: 'onClickReopen',
    changeThreadStatusToDone: 'onClickDone',
  }),
);

export default enhance(Header);
