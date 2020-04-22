import React, { Component, Fragment } from 'react';
import classNames from 'classnames';
import { UncontrolledTooltip } from 'reactstrap';
import Verified from 'shared/components/Verified';
import Attachments from './Attachments';
import { visualTime } from 'shared/utils';
import { formatMessage } from '../utils';

class Message extends Component {
  render() {
    const { message, isShowName, isShowAvatar } = this.props;
    const { mid, content, customer, user, isVerified, additionData, msgCreatedAt } = message;
    const ownerName = (isVerified && user && user.name) || (customer && customer.name);
    const ownerAvatar = (isVerified && user && user.avatarUrl) || (customer && customer.additionData.avatarUrl);
    const attachments = additionData && additionData.attachments;
    const tooltipId = `message_${mid}`;
    return (
      <Fragment>
        <div
          className={classNames('mb-1 mw-75', {
            'pr-5 float-right': isVerified,
            'pl-5': !isVerified,
          })}>
          {isShowName && (
            <small
              className={classNames('d-block text-secondary', {
                'float-right': isVerified,
                'pl-3': !isVerified,
              })}>
              {ownerName}
              {isVerified && <Verified />}
            </small>
          )}
          <div className='position-relative'>
            {isShowAvatar && (
              <img
                className='rounded-circle position-absolute mt-1'
                src={ownerAvatar}
                width={25}
                style={{
                  [isVerified ? 'right' : 'left']: '-2rem',
                  bottom: '.25rem',
                }}
                alt='avatar'
              />
            )}

            <Fragment>
              <span
                id={tooltipId}
                className={classNames('px-3 py-1 d-inline-block round-circle text-pre-wrap', {
                  'bg-dark text-white float-right': isVerified,
                  'bg-light': !isVerified,
                })}>
                {formatMessage(content)}
                {attachments && <Attachments attachments={attachments} />}
              </span>
              <div className='clearfix' />
              <UncontrolledTooltip
                hideArrow
                delay={{ hide: 0 }}
                placement={isVerified ? 'left' : 'right'}
                target={tooltipId}>
                <small>{visualTime(msgCreatedAt)}</small>
              </UncontrolledTooltip>
            </Fragment>
          </div>
        </div>
        <div className='clearfix' />
      </Fragment>
    );
  }
}

export default Message;
