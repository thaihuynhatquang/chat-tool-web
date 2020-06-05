import classNames from 'classnames';
import { CUSTOMER, DEFAULT_AVATAR_URL } from 'shared/constants';
import React, { Fragment } from 'react';
import { compose, lifecycle, mapProps, pure, withStateHandlers } from 'recompose';
import Verified from 'shared/components/Verified';
import { withExpiredAttachment } from 'shared/hooks';
import { visualTime } from 'shared/utils';
import { SEND_STATUS_ARRIVED, SEND_STATUS_COMPLETED, SEND_STATUS_PENDING } from '../constants';
import { formatMessage } from '../utils';
import ActionMessage from './ActionMessage';
import Attachments from './Attachments';

const Message = (props) => {
  const {
    openMessage = false,
    isShowName = true,
    isShowAvatar = true,
    sendingStatus = null,
    errorMessage,
    mid,
    content,
    name,
    onClickAvatar,
    avatarUrl,
    isVerified,
    isInverse = false,
    attachments,
    onErrorAvatar,
    msgCreatedAt,
    clearMiss,
    processed,
    isShowAction,
  } = props;

  const tooltipId = `message_${mid}`;
  return (
    <Fragment>
      <div
        className={classNames('mb-1 mw-55 mw-sm-80', {
          'pr-5 float-right': isInverse,
          'pl-5': !isInverse,
        })}>
        {isShowName && (
          <small
            className={classNames('d-block text-secondary', {
              'float-right': isInverse,
              'pl-3': !isInverse,
            })}>
            {name}
            {!!isVerified && <Verified />}
          </small>
        )}
        <div className='position-relative wrap-text'>
          {isShowAvatar && (
            <Fragment>
              <img
                className='rounded-circle position-absolute mt-1 object-fit-cover cursor-pointer'
                src={avatarUrl}
                alt=''
                title={name}
                width={25}
                height={25}
                onClick={onClickAvatar}
                onError={(e) => onErrorAvatar(true)}
                style={{
                  [isInverse ? 'right' : 'left']: '-2rem',
                  bottom: '.25rem',
                }}
              />
            </Fragment>
          )}
          <span
            id={tooltipId}
            className={classNames(
              'px-3 py-1 d-inline-block round-circle text-pre-wrap text-justify position-relative mw-100',
              {
                'bg-dark text-white float-right': isInverse,
                'bg-light': !isInverse,
              },
            )}
            title={visualTime(msgCreatedAt)}>
            <div
              className={classNames({
                'cursor-pointer': openMessage,
              })}
              onClick={() => {
                openMessage && window.open(`https://facebook.com/${mid}`);
              }}>
              {formatMessage(content || '')}
            </div>
            {attachments && <Attachments id={mid} attachments={attachments} />}
            {sendingStatus && (
              <small
                className='position-absolute'
                style={{
                  [isInverse ? 'left' : 'right']: '-1.25rem',
                  bottom: '.35rem',
                }}>
                <i
                  className={classNames('text-dark', {
                    'far fa-circle': sendingStatus === SEND_STATUS_PENDING,
                    'far fa-check-circle': sendingStatus === SEND_STATUS_ARRIVED,
                    'fas fa-check-circle': sendingStatus === SEND_STATUS_COMPLETED,
                  })}
                />
              </small>
            )}
          </span>

          <div className='clearfix' />
        </div>
        {errorMessage && (
          <small
            className={classNames('d-block text-danger text-pre-wrap text-justify', {
              'pl-1': !isInverse,
            })}>
            <i className='fas fa-exclamation-circle' /> {errorMessage}
          </small>
        )}
        {isShowAction && isShowAvatar && !isVerified && !errorMessage ? (
          <div className='pl-1'>
            <ActionMessage mid={mid} clearMiss={clearMiss} processed={processed} />
          </div>
        ) : (
          ''
        )}
      </div>
      <div className='clearfix' />
    </Fragment>
  );
};

const enhance = compose(
  withExpiredAttachment('updateAvatar', ''),
  withStateHandlers(
    { errorAvatar: false },
    {
      onErrorAvatar: (state) => (error) => ({ errorAvatar: error }),
      onClickAvatar: (state, props) => () => {
        const { handleError, customerId } = props;

        state.errorAvatar &&
          customerId &&
          handleError({
            type: CUSTOMER,
            id: customerId,
          })();
      },
    },
  ),
  mapProps(({ avatarUrl, updateAvatar, ...rest }) => {
    return {
      ...rest,
      avatarUrl: updateAvatar || avatarUrl || DEFAULT_AVATAR_URL,
    };
  }),
  lifecycle({
    componentDidUpdate(prevProps) {
      const props = this.props;
      if (props.avatarUrl !== prevProps.avatarUrl) {
        props.updateAvatarCustomerAllMessages({
          id: props.customerId,
          avatarUrl: props.avatarUrl,
        });
      }
    },
  }),
  pure,
);
export default enhance(Message);
