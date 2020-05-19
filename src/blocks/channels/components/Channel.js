import React from 'react';
import { UncontrolledTooltip } from 'reactstrap';
import classNames from 'classnames';
import { DEFAULT_AVATAR_URL } from 'common/constants';

const Channel = (props) => {
  const {
    channel: { id, title, additionData, missCount = 0 },
    isSelected = false,
    onSelectChannel,
  } = props;
  const elementId = `channel-${id}`;
  const avatarUrl = (additionData && additionData.avatarUrl) || DEFAULT_AVATAR_URL;
  return (
    <div
      id={elementId}
      className={classNames('cursor-pointer p-2', {
        'item-selected': isSelected,
        'item-not-selected': !isSelected,
      })}
      onClick={onSelectChannel(id)}>
      <div className='position-relative'>
        <img src={avatarUrl} alt={title} className='rounded-circle mw-100 border' />
        {missCount > 0 && (
          <span
            className='badge badge-pill badge-danger position-absolute'
            style={{ bottom: '-0.25rem', right: '-0.25rem' }}>
            <small>{missCount}</small>
          </span>
        )}
      </div>
      <UncontrolledTooltip placement='right' target={elementId} delay={{ hide: 0 }} hideArrow>
        <small>{title}</small>
      </UncontrolledTooltip>
    </div>
  );
};

export default Channel;
