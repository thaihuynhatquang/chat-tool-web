import React from 'react';
import classNames from 'classnames';
import { pure } from 'recompose';
import { CustomInput, UncontrolledTooltip } from 'reactstrap';
import { DEFAULT_AVATAR_URL } from 'common/constants';
import { withToggle } from 'shared/hooks';

const listGroupClass = 'list-group-item list-group-item-action cursor-pointer pl-3 pr-0 py-1 select-none';

const Channel = (props) => {
  const {
    id,
    title,
    avatarUrl = DEFAULT_AVATAR_URL,
    missCount = 0,
    isSelected = false,
    onSelect,
    isPanelShow,
    togglePanel,
  } = props;
  const elementId = `channel-${id}`;
  return (
    <div
      id={elementId}
      className={classNames('position-relative p-2', {
        'item-selected': isSelected,
        'item-not-selected': !isSelected,
      })}>
      <div className='position-relative'>
        <img
          alt={title}
          src={avatarUrl || DEFAULT_AVATAR_URL}
          className='rounded-circle mw-100 border cursor-pointer'
          onClick={onSelect(id)}
          onContextMenu={togglePanel}
        />
        {missCount > 0 && (
          <span
            className='badge badge-pill badge-danger position-absolute'
            style={{ bottom: '-0.25rem', right: '-0.25rem' }}>
            <small>{missCount}</small>
          </span>
        )}
      </div>
      {isPanelShow && (
        <ul
          className='list-group text-left position-absolute'
          style={{
            top: 0,
            left: '4.3rem',
            minWidth: 180,
            zIndex: 1,
          }}>
          <li className={`${listGroupClass} text-success`}>
            <small>Quản lý kênh</small>
          </li>

          <li className={`${listGroupClass} text-secondary`}>
            <small>Âm thông báo</small>
            <CustomInput className='float-right' type='checkbox' label='&nbsp;' defaultChecked={true} />
          </li>
          <li className={`${listGroupClass} text-secondary`}>
            <small>Tự động phân công</small>
            <CustomInput className='float-right' type='checkbox' label='&nbsp;' defaultChecked={true} />
          </li>
          <li className={`${listGroupClass} text-danger`}>
            <small>Thoát kênh</small>
          </li>
        </ul>
      )}
      {!isPanelShow && (
        <UncontrolledTooltip placement='right' target={elementId} delay={{ hide: 0 }} hideArrow>
          <small>{title}</small>
        </UncontrolledTooltip>
      )}
    </div>
  );
};

export default withToggle('Panel')(pure(Channel));
