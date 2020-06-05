import Tooltip from 'antd/lib/tooltip';
import classNames from 'classnames';
import { CHANNEL, DEFAULT_AVATAR_URL } from 'shared/constants';
import React from 'react';
import { CustomInput } from 'reactstrap';
import { compose, pure } from 'recompose';
import { withExpiredAttachment, withHiddenBlur, withToggle } from 'shared/hooks';

const avatarSize = 50;
const listGroupClass = 'list-group-item list-group-item-action cursor-pointer pl-3 pr-0 py-1 select-none';
const Channel = (props) => {
  const {
    id,
    title,
    avatarUrl = DEFAULT_AVATAR_URL,
    missCount = 0,
    smallIcon,
    isSelected = false,
    onSelect,
    isPanelShow,
    togglePanel,
    isTooltipShow,
    showTooltip,
    hideTooltip,
    handleError,
    updateAttachment,
  } = props;

  return (
    <Tooltip
      title={title}
      placement='right'
      arrowPointAtCenter
      overlayClassName='tooltip-overlay'
      visible={isTooltipShow && !isPanelShow}
      mouseLeaveDelay={0}>
      <div
        className={classNames('position-relative p-2', {
          'item-selected': isSelected,
          'item-not-selected': !isSelected,
        })}
        onMouseEnter={showTooltip}
        onMouseLeave={hideTooltip}>
        <div className='position-relative'>
          <p className='d-sm-none mx-auto mb-1'>{title}</p>
          <div className='position-relative mx-auto' style={{ width: avatarSize, height: avatarSize }}>
            <img
              alt={title}
              src={updateAttachment || avatarUrl || DEFAULT_AVATAR_URL}
              className='rounded-circle mw-100 cursor-pointer object-fit-cover'
              onClick={onSelect(id)}
              onContextMenu={togglePanel}
              width={avatarSize}
              height={avatarSize}
              onError={handleError({
                id,
                type: CHANNEL,
              })}
            />
            {missCount > 0 && (
              <span
                className='badge badge-pill badge-danger position-absolute'
                style={{ top: '-0.25rem', right: '-0.25rem' }}>
                <small>{missCount}</small>
              </span>
            )}
            {smallIcon && (
              <i
                className={classNames(smallIcon, 'position-absolute text-primary')}
                style={{
                  bottom: '-0.25rem',
                  right: '-0.25rem',
                  fontSize: '1.1rem',
                }}
              />
            )}
          </div>
        </div>
        {isPanelShow && <ChannelPanelWithHiddenBlur {...props} />}
      </div>
    </Tooltip>
  );
};

export const ChannelPanel = (props) => {
  const { blurRef, id, onClickManageChannel, configs, userConfigs, updateUserConfigs } = props;
  const isUserReceiveNotification =
    userConfigs && typeof userConfigs.receiveNotification === 'boolean' ? userConfigs.receiveNotification : true;
  const isUserReceiveAutoAssign =
    userConfigs && typeof userConfigs.receiveAutoAssign === 'boolean' ? userConfigs.receiveAutoAssign : true;
  return (
    <ul
      className='list-group text-left position-absolute'
      style={{
        top: 0,
        left: '4.3rem',
        minWidth: 180,
        zIndex: 1,
      }}
      ref={blurRef}>
      <li className={`${listGroupClass} text-success`} onClick={onClickManageChannel(id)}>
        <small>Quản lý kênh</small>
      </li>
      <li className={`${listGroupClass} text-secondary`}>
        <small>Âm thông báo</small>
        <CustomInput
          id={`notification-sound-channel-${id}`}
          className='float-right'
          type='checkbox'
          label='&nbsp;'
          checked={isUserReceiveNotification}
          onChange={updateUserConfigs({
            receiveNotification: !isUserReceiveNotification,
          })}
        />
      </li>
      {configs && configs.assignMode === 'auto' && (
        <li className={`${listGroupClass} text-secondary`}>
          <small>Phân công cho tôi</small>
          <CustomInput
            id={`autoAssignChannel${id}`}
            className='float-right'
            type='checkbox'
            label='&nbsp;'
            checked={isUserReceiveAutoAssign}
            onChange={updateUserConfigs({
              receiveAutoAssign: !isUserReceiveAutoAssign,
            })}
          />
        </li>
      )}
      {/* <li className={`${listGroupClass} text-danger disabled`}>
        <small>Thoát kênh</small>
      </li> */}
    </ul>
  );
};

const ChannelPanelWithHiddenBlur = withHiddenBlur('hidePanel')(ChannelPanel);

const enhance = compose(
  withExpiredAttachment('updateAttachment', ''),
  withToggle('Panel'),
  withToggle('Tooltip'),
  pure,
);

export default enhance(Channel);
