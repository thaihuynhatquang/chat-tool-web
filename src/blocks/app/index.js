import React from 'react';
import Channels from 'blocks/channels';
import ThreadHeader from 'blocks/threadsHeader';
import ThreadSearch from 'blocks/threadsSearch';
import Threads from 'blocks/threads';
import MessagesHeader from 'blocks/messagesHeader';
import Messages from 'blocks/messages';
import MessagesSendBox from 'blocks/messagesSendBox';
import ThreadInfo from 'blocks/threadsInfo';
import CustomerInfo from 'blocks/customersInfo';
import User from 'blocks/user';

import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { fetchCurrentUserSucceed } from './actions';
import * as services from './services';
import { branch, mapProps, renderNothing, compose } from 'recompose';
import { withFetcher } from 'shared/hooks';

const App = () => (
  <div className='position-absolute d-flex' style={{ left: 0, right: 0, top: 0, bottom: 0, overflow: 'hidden' }}>
    <div className='flex-grow-0 flex-shrink-0' style={{ width: 70 }}>
      <div className='d-flex flex-column justify-content-between border-right text-center h-100 '>
        <Channels />
        <User />
      </div>
    </div>
    <div className='flex-grow-0 flex-shrink-0' style={{ width: '25%' }}>
      <div className='h-100 d-flex flex-column position-relative'>
        <ThreadHeader />
        <div className='px-2 pt-2 border-bottom'>
          <ThreadSearch />
        </div>
        <div id='threadlist' className='h-100' style={{ overflowX: 'hidden' }}>
          <Threads />
        </div>
      </div>
    </div>
    <div className='flex-grow-1'>
      <div className='d-flex h-100 justify-content-between flex-column border-left'>
        <MessagesHeader />
        <Messages />
        <MessagesSendBox />
      </div>
    </div>
    <div className='flex-grow-0 flex-shrink-0' style={{ width: '22%' }}>
      <div className='border-left h-100' style={{ overflowY: 'auto' }}>
        <ThreadInfo />
        <CustomerInfo />
      </div>
    </div>
  </div>
);

const mapState = (state) => ({ user: state.user });
const mapDispatch = (dispatch) => bindActionCreators({ fetchCurrentUserSucceed }, dispatch);

const enhance = compose(
  connect(mapState, mapDispatch),
  withFetcher(
    'user',
    async (props) => {
      try {
        const { data: userInfo } = await services.me();
        props.fetchCurrentUserSucceed(userInfo);
      } catch (err) {
        console.log(err);
      }
    },
    { fetchOnMount: true },
  ),
  branch((props) => !props.user, renderNothing),
  mapProps(({ user, fetchCurrentUserSucceed, userFetcher, ...rest }) => rest),
);

export default enhance(App);
// export default App;
