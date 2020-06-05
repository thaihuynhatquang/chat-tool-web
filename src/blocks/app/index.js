import Channels from 'blocks/channels';
import CustomerInfo from 'blocks/customersInfo';
import Messages from 'blocks/messages';
import MessagesHeader from 'blocks/messagesHeader';
import MessagesSendBox from 'blocks/sendBox';
import StockChecking from 'blocks/stockChecking';
import Threads from 'blocks/threads';
import ThreadHeader from 'blocks/threadsHeader';
import ThreadInfo from 'blocks/threadsInfo';
import ThreadSearch from 'blocks/threadsSearch';
import TransferThreads from 'blocks/transferThreads';
import User from 'blocks/user';
import React, { Fragment } from 'react';
import { connect } from 'react-redux';
import { branch, compose, lifecycle, mapProps, renderNothing, withProps, withStateHandlers } from 'recompose';
import { bindActionCreators } from 'redux';
import * as storeGetter from 'shared/getEntities';
import { withPanelToggle } from 'shared/hooks';
import * as actions from './actions';

const IFrameCheckStock = (props) => {
  return (
    <div className='position-relative w-100 border-0' style={{ height: 500 }}>
      <StockChecking />
    </div>
  );
};

const WrapPanelStockChecking = withPanelToggle('Kiểm tra tồn kho')(IFrameCheckStock);

const tabList = ['Kênh', 'Phòng', 'Tin nhắn', 'Khách hàng'];

const MobileLayout = (props) => {
  const mobileMainLayoutHeight = 'calc(100vh - 20px - 69px)';
  const { currentTabIdx, goPrev, goNext, channelId, threadId } = props;
  return (
    <div className='position-fixed' style={{ left: 0, right: 0, top: 0, bottom: 0, overflow: 'hidden' }}>
      <TransferThreads />
      <div className='d-flex justify-content-between w-100 text-sm'>
        <button className='d-inline-block btn btn-link btn-sm py-0' onClick={goPrev} style={{ fontSize: 12 }}>
          {currentTabIdx - 1 >= 0 && (
            <Fragment>
              <i className='fa fa-caret-left pr-2' />
              {tabList[currentTabIdx - 1]}
            </Fragment>
          )}
        </button>

        <button className='d-inline-block btn btn-link btn-sm py-0' onClick={goNext} style={{ fontSize: 12 }}>
          {currentTabIdx + 1 < tabList.length && (
            <Fragment>
              {tabList[currentTabIdx + 1]}
              <i className='fa fa-caret-right pl-2' />
            </Fragment>
          )}
        </button>
      </div>
      {!channelId && !threadId && currentTabIdx !== 3 && (
        <div className='flex-grow-0 flex-shrink-0 w-100' style={{ height: mobileMainLayoutHeight }}>
          <div className='d-flex flex-column justify-content-between border-right text-center h-100'>
            <div>
              <Channels />
            </div>
            <User />
          </div>
        </div>
      )}
      {channelId && !threadId && currentTabIdx !== 3 && (
        <div className='flex-grow-0 flex-shrink-0 w-100' style={{ height: mobileMainLayoutHeight }}>
          <div className='d-flex h-100 flex-column position-relative'>
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
      )}
      {channelId && threadId && currentTabIdx !== 3 && (
        <div className='flex-grow-1' style={{ height: mobileMainLayoutHeight }}>
          <div className='d-flex h-100 justify-content-between flex-column border-left'>
            <MessagesHeader />
            <Messages />
            <span className='border-top'>
              <MessagesSendBox />
            </span>
          </div>
        </div>
      )}
      {currentTabIdx === 3 && (
        <div
          className='d-flex flex-column flex-grow-0 flex-shrink-0 border-left w-100'
          style={{ height: mobileMainLayoutHeight }}>
          <div className='flex-grow-0 h-100' style={{ overflowY: 'auto' }}>
            <ThreadInfo />
            <CustomerInfo />
          </div>
          <div className='flex-grow-1'>
            <WrapPanelStockChecking />
          </div>
        </div>
      )}
    </div>
  );
};

const DesktopLayout = (props) => (
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
      <div className='flex-grow-1'>
        <WrapPanelStockChecking />
      </div>
    </div>
  </div>
);

const App = (props) => (props.isMobile ? <MobileLayout {...props} /> : <DesktopLayout {...props} />);

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
