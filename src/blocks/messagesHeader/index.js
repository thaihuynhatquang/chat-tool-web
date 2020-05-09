import Header from './components/Header';
import { connect } from 'react-redux';
import { branch, mapProps, renderNothing, renameProps, withHandlers, compose } from 'recompose';
import { THREAD_STATUS_SPAM, THREAD_STATUS_PROCESSING, THREAD_STATUS_DONE } from 'common/constants';
import * as services from './services';

const mapState = (state) => {
  const {
    threads: { thread },
  } = state;
  return { selectedThread: thread };
};

const enhance = compose(
  connect(mapState, null),
  branch((props) => !props.selectedThread || !props.selectedThread.id, renderNothing),
  withHandlers({
    changeThreadStatus: (props) => (status) => () => {
      const {
        selectedThread: { id: threadId },
      } = props;
      services.updateThreadStatus({
        threadId,
        status,
      }); // Will handle action in socket
    },
  }),
  withHandlers({
    changeThreadStatusToSpam: (props) => props.changeThreadStatus(THREAD_STATUS_SPAM),
    changeThreadStatusToProcessing: (props) => props.changeThreadStatus(THREAD_STATUS_PROCESSING),
    changeThreadStatusToDone: (props) => props.changeThreadStatus(THREAD_STATUS_DONE),
  }),
  mapProps(({ changeThreadStatus, updateThreadStatusSucceed, ...rest }) => rest),
  renameProps({
    selectedThread: 'thread',
    changeThreadStatusToSpam: 'onClickSpam',
    changeThreadStatusToProcessing: 'onClickReopen',
    changeThreadStatusToDone: 'onClickDone',
  }),
);

export default enhance(Header);
