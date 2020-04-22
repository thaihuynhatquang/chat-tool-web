import React, { Component } from 'react';
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

class Header extends Component {
  render() {
    const { status, count } = this.props;
    const selectStatus = statusNameMap[status];

    return (
      <UncontrolledDropdown>
        <DropdownToggle className='w-100' color='light'>
          <span>{selectStatus.name}</span>{' '}
          {count > 0 && (
            <Badge color='danger' pill>
              {count}
            </Badge>
          )}
        </DropdownToggle>
      </UncontrolledDropdown>
    );
  }
}

export default Header;
