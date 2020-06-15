import Channels from 'blocks/channels';
import CustomerInfo from 'blocks/customersInfo';
import Messages from 'blocks/messages';
import MessagesHeader from 'blocks/messagesHeader';
import MessagesSendBox from 'blocks/sendBox';
import Threads from 'blocks/threads';
import ThreadHeader from 'blocks/threadsHeader';
import ThreadInfo from 'blocks/threadsInfo';
import ThreadSearch from 'blocks/threadsSearch';
import TransferThreads from 'blocks/transferThreads';
import User from 'blocks/user';
import { client } from 'configs/axios';
import React, { Fragment } from 'react';
import { connect } from 'react-redux';
import { branch, compose, lifecycle, mapProps, renderNothing, withProps, withStateHandlers } from 'recompose';
import { bindActionCreators } from 'redux';
import * as storeGetter from 'shared/getEntities';
import { withFetcher } from 'shared/hooks';
import * as actions from './actions';

const tabList = ['Kênh', 'Phòng', 'Tin nhắn', 'Khách hàng'];

const App = (props) => {
  return (
    <div className='position-fixed d-flex' style={{ left: 0, right: 0, top: 0, bottom: 0, overflow: 'hidden' }}>
      <TransferThreads />
      <div style={{ width: 70 }}>
        <div className='d-flex flex-column justify-content-between border-right text-center h-100'>
          <div>
            <Channels />
          </div>
          <User />
        </div>
      </div>
      <div style={{ width: '25vw' }}>
        <div className='h-100 d-flex flex-column position-relative'>
          {!!props.channelId && (
            <Fragment>
              <ThreadHeader />
              <div className='px-2 pt-2 border-bottom'>
                <ThreadSearch />
              </div>
              <div id='threadlist' className='h-100' style={{ overflowX: 'hidden' }}>
                <Threads />
              </div>
            </Fragment>
          )}
        </div>
      </div>
      <div
        className='d-flex h-100 justify-content-between flex-column border-left'
        style={{ width: 'calc(53vw - 70px)' }}>
        <MessagesHeader />
        <Messages />
        <span className='border-top'>
          <MessagesSendBox />
        </span>
      </div>
      <div className='d-flex flex-column border-left' style={{ width: '22vw' }}>
        <div className='flex-grow-0' style={{ overflowY: 'auto' }}>
          <ThreadInfo />
          <CustomerInfo />
        </div>
      </div>
    </div>
  );
};

const mapState = (state) => ({
  user: storeGetter.getMe(state),
  channelId: state.selectedChannelId,
  threadId: state.selectedThreadId,
});
const mapDispatch = (dispatch) => bindActionCreators(actions, dispatch);

const enhance = compose(
  connect(mapState, mapDispatch),
  branch((props) => !props.user, renderNothing),
  withProps(() => ({ isMobile: window.innerWidth < 1200 })),
  withFetcher(
    'user',
    async (props) => {
      try {
        const { data: userInfo } = await client.get('/api/v1/users/me');
        props.fetchCurrentUserSucceed(userInfo);
      } catch (err) {
        if (err.response && err.response.status === 401) {
          console.log(err);
        }
      }
    },
    { fetchOnMount: true },
  ),
  withStateHandlers(
    { currentTabIdx: 0 },
    {
      goNext: ({ currentTabIdx }, { channelId, threadId }) => () => {
        return {
          currentTabIdx: (currentTabIdx + 1) % tabList.length,
        };
      },
      goPrev: ({ currentTabIdx }, props) => () => {
        if (currentTabIdx === 1) {
          props.removeSelectedChannelId();
        } else if (currentTabIdx === 2) {
          props.removeSelectedThreadId();
        }
        return {
          currentTabIdx: (currentTabIdx - 1 + tabList.length) % tabList.length,
        };
      },
      updateCurrentTabIdx: () => (value) => ({ currentTabIdx: value }),
    },
  ),
  lifecycle({
    componentDidUpdate() {
      const { currentTabIdx, channelId, threadId, updateCurrentTabIdx, isMobile } = this.props;
      if (isMobile && currentTabIdx !== 3) {
        if (!channelId) {
          if (currentTabIdx !== 0) updateCurrentTabIdx(0);
        } else if (!threadId) {
          if (currentTabIdx !== 1) updateCurrentTabIdx(1);
        } else {
          if (currentTabIdx !== 2) updateCurrentTabIdx(2);
        }
      }
    },
  }),
  mapProps(({ user, userFetcher, fetchCurrentUserSucceed, ...rest }) => rest),
);

export default enhance(App);
