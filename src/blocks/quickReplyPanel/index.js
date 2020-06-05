import React from 'react';
import { connect } from 'react-redux';
import { branch, compose, renderNothing, withHandlers } from 'recompose';
import * as storeGetter from 'shared/getEntities';
import { withHiddenBlur, withToggle } from 'shared/hooks';
import QuickReplies from './components/QuickReplies';
import QuickReplyInput from './components/QuickReplyInput';

const QuickReplyPanel = (props) => {
  const { isQuickRepliesShow, toggleQuickReplies, onClickItem, hideQuickReplies, blurRef } = props;
  return (
    <div className='position-relative'>
      <i className='fas fa-bars' onClick={toggleQuickReplies} />
      {isQuickRepliesShow && (
        <div
          ref={blurRef}
          className='position-absolute'
          style={{
            bottom: '1.5rem',
            width: '300px',
            zIndex: 1,
          }}>
          <QuickReplies onClickItem={onClickItem} />
          <QuickReplyInput hideQuickReplies={hideQuickReplies} />
        </div>
      )}
    </div>
  );
};

const mapState = (state) => {
  const thread = storeGetter.getSelectedThread(state);
  return {
    threadId: thread && thread.id,
  };
};

const enhance = compose(
  connect(mapState),
  branch((props) => !props.threadId, renderNothing),
  withToggle('quickReplies', false),
  withHiddenBlur('hideQuickReplies'),
  withHandlers({
    onClickItem: (props) => (quickReply) => (e) => {
      props.hideQuickReplies(e);
      props.onMessageChange(quickReply.content);
    },
  }),
);

export default enhance(QuickReplyPanel);
