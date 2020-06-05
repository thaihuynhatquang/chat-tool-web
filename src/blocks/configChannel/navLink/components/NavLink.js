import {
  CHANNEL_CONFIG_GENERAL_SETTINGS,
  CHANNEL_CONFIG_REPORTS,
  CHANNEL_CONFIG_ROLES_AND_PERMISSIONS,
} from 'shared/constants';
import React, { Fragment } from 'react';
import { ListGroup, ListGroupItem } from 'reactstrap';

const NavLink = (props) => {
  const { changeRoute, channelId, name } = props;
  return (
    <Fragment>
      <span className='float-left btn btn-link font-italic' onClick={changeRoute('/')}>
        <small>
          <u>
            <i className='fas fa-caret-left' /> Quay lại
          </u>
        </small>
      </span>
      <span className='float-right text-secondary px-3 py-2 font-italic'>{name}</span>
      <div className='clearfix' />
      <ListGroup flush>
        <ListGroupItem
          action
          onClick={changeRoute(`/channel/${channelId}/${CHANNEL_CONFIG_GENERAL_SETTINGS}`)}
          className='cursor-pointer border-top-0'>
          <span className='float-right'>Cài đặt chung</span>
        </ListGroupItem>
        <ListGroupItem
          action
          onClick={changeRoute(`/channel/${channelId}/${CHANNEL_CONFIG_ROLES_AND_PERMISSIONS}`)}
          className='cursor-pointer'>
          <span className='float-right'>Phân quyền người dùng</span>
        </ListGroupItem>
        <ListGroupItem
          action
          disabled
          onClick={changeRoute(`/channel/${channelId}/${CHANNEL_CONFIG_REPORTS}`)}
          className='cursor-disabled'>
          <span className='float-right'>Báo cáo, thống kê</span>
        </ListGroupItem>
      </ListGroup>
    </Fragment>
  );
};

export default NavLink;
