import classNames from 'classnames';
import { THREAD_STATUS_PROCESSING, THREAD_STATUS_UNREAD } from 'shared/constants';
import React from 'react';
import { Badge, Col, DropdownToggle, Row, UncontrolledDropdown } from 'reactstrap';
import { pure } from 'recompose';

const Tab = (props) => {
  const { title, count, isActive, onClick } = props;

  const color = classNames({
    primary: isActive,
    white: !isActive,
  });
  return (
    <UncontrolledDropdown onClick={onClick}>
      <DropdownToggle className='w-100 rounded-0 box-shadow-none' color={color}>
        <span className='pr-2'>
          <small>{title}</small>
        </span>
        {typeof count === 'number' && (
          <Badge color='light'>
            <small>{count}</small>
          </Badge>
        )}
      </DropdownToggle>
    </UncontrolledDropdown>
  );
};

const Header = (props) => {
  const { processingCount, unreadCount, currentFilterStatus, changeFilterStatus } = props;

  return (
    <Row noGutters className='pb-2'>
      <Col col={6}>
        <Tab
          title='Đang hoạt động'
          count={processingCount}
          isActive={currentFilterStatus === THREAD_STATUS_PROCESSING}
          onClick={changeFilterStatus(THREAD_STATUS_PROCESSING)}
        />
      </Col>
      <Col col={6}>
        <Tab
          title='Chưa xử lý'
          count={unreadCount}
          isActive={currentFilterStatus === THREAD_STATUS_UNREAD}
          onClick={changeFilterStatus(THREAD_STATUS_UNREAD)}
        />
      </Col>
    </Row>
  );
};

export default pure(Header);
