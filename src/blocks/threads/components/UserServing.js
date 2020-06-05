import Tooltip from 'antd/lib/tooltip';
import { DEFAULT_AVATAR_URL } from 'shared/constants';
import React from 'react';
import { withToggle } from 'shared/hooks';

const AVATAR_SIZE = 20;
const UserServing = (props) => {
  const { user, isTooltipShow, showTooltip, hideTooltip } = props;
  return (
    <Tooltip
      title={user.name}
      placement='top'
      arrowPointAtCenter
      overlayClassName='tooltip-overlay'
      visible={isTooltipShow}
      mouseLeaveDelay={0}>
      <img
        alt={user.name}
        src={user.avatarUrl || DEFAULT_AVATAR_URL}
        className='rounded-circle object-fit-cover'
        width={AVATAR_SIZE}
        height={AVATAR_SIZE}
        onMouseEnter={showTooltip}
        onMouseLeave={hideTooltip}
      />
    </Tooltip>
  );
};

export default withToggle('Tooltip')(UserServing);
