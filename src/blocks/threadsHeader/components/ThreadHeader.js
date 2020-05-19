import React from 'react';
import { Badge, UncontrolledDropdown, DropdownToggle } from 'reactstrap';
import {
  THREAD_STATUS_UNREAD,
  THREAD_STATUS_PROCESSING,
  THREAD_STATUS_SPAM,
  THREAD_STATUS_DONE,
} from 'common/constants';

const statusNameMap = {
  [THREAD_STATUS_UNREAD]: {
    name: 'Chưa đọc',
    color: 'danger',
    icon: 'far fa-envelope',
  },
  [THREAD_STATUS_PROCESSING]: {
    name: 'Đang hoạt động',
    color: 'primary',
    icon: 'far fa-comments',
  },
  [THREAD_STATUS_SPAM]: {
    name: 'Spam',
    color: 'secondary',
    icon: 'far fa-trash-alt',
  },
  [THREAD_STATUS_DONE]: {
    name: 'Hoàn thành',
    color: 'success',
    icon: 'fas fa-check',
  },
};

const Header = (props) => {
  const {
    filterBy: { status, title, isMiss, sort },
    count,
  } = props;
  const selectStatus = statusNameMap[status];
  const searchStatus = [selectStatus.name];
  if (title) searchStatus.push(`Tên '${title}'`);
  if (isMiss) searchStatus.push('Chưa trả lời');
  if (sort && sort === 'asc') searchStatus.push('Cũ nhất');

  return (
    <UncontrolledDropdown>
      <DropdownToggle className='w-100' color='light'>
        <small>
          <span>{searchStatus.join(', ')}</span>
          {count > 0 && (
            <Badge color='danger' pill className='ml-1'>
              {count}
            </Badge>
          )}
        </small>
      </DropdownToggle>
    </UncontrolledDropdown>
  );
};

export default Header;
