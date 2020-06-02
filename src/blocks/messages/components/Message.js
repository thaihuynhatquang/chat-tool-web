import React, { Fragment } from 'react';
import classNames from 'classnames';
import { pure } from 'recompose';
import Verified from 'shared/components/Verified';
import Attachments from './Attachments';
import { visualTime } from 'shared/utils';
import { formatMessage } from '../utils';
import { SEND_STATUS_PENDING, SEND_STATUS_ARRIVED, SEND_STATUS_COMPLETED } from '../constants';

const Message = (props) => {
  const {
    isShowName = true,
    isShowAvatar = true,
    sendingStatus = null,
    errorMessage,
    mid,
    content,
    name,
    avatarUrl,
    isVerified,
    isInverse = false,
    attachments,
    msgCreatedAt,
  } = props;
  const tooltipId = `message_${mid}`;
  return (
    <Fragment>
      <div
        className={classNames('mb-1 mw-55', {
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
        <div className='position-relative'>
          {isShowAvatar && (
            <img
              className='rounded-circle position-absolute mt-1 object-fit-cover'
              src={avatarUrl}
              alt={name}
              title={name}
              width={25}
              height={25}
              style={{
                [isInverse ? 'right' : 'left']: '-2rem',
                bottom: '.25rem',
              }}
            />
          )}
          <span
            id={tooltipId}
            className={classNames(
              'px-3 py-1 d-inline-block round-circle text-pre-wrap text-justify position-relative',
              {
                'bg-dark text-white float-right': isInverse,
                'bg-light': !isInverse,
              },
            )}
            title={visualTime(msgCreatedAt)}>
            {formatMessage(content || '')}
            {attachments && <Attachments attachments={attachments} />}
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
      </div>
      <div className='clearfix' />
    </Fragment>
  );
};

export default pure(Message);
