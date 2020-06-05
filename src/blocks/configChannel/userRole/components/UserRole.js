import Popconfirm from 'antd/lib/popconfirm';
import Table from 'antd/lib/table';
import Tag from 'antd/lib/tag';
import { updateUserConfigsOfChannel } from 'blocks/channels/services';
import { PERMISSION_REMOVE_USER_FROM_CHANNEL, PERMISSION_UPDATE_USER_ROLE } from 'shared/constants';
import moment from 'moment';
import React, { Fragment } from 'react';
import { canDo } from 'shared/utils';
import ModalUpdateRole from './ModalUpdateRole';

const UserRole = (props) => {
  const {
    me,
    channelId,
    roles,
    userUpdateRole,
    usersRole,
    usersRoleFetcher,
    pagination,
    openModalUpdateRole,
    deleteUser,
    onClickPaginate,
    confirmUpdateRole,
    cancelUpdateRole,
    changeUpdateRole,
    submitUpdateRole,
    visibleModal,
  } = props;

  const isCurrentUserAdmin = canDo(me, channelId, PERMISSION_REMOVE_USER_FROM_CHANNEL);

  const columns = [
    {
      title: 'Tên người dùng',
      dataIndex: 'name',
      key: 'name',
      render: function render(text, user) {
        return (
          <span className='text-primary'>
            {text}
            <span className='d-inline-block font-size-sm ml-3'>
              {user.isOnline ? (
                <i className='fas fa-circle text-success fa-xs' />
              ) : (
                <p className='text-secondary'>{moment(user.lastLoginAt).fromNow()}</p>
              )}
            </span>
          </span>
        );
      },
    },
    {
      title: 'Số phòng',
      key: 'threadsCount',
      dataIndex: 'threadsCount',
      render: function render(threadsCount, user) {
        return <Tag color='red'>{threadsCount}</Tag>;
      },
    },
    {
      title: 'Nhận phòng chat?',
      key: 'receiveAutoAssign',
      dataIndex: 'receiveAutoAssign',
      render: function render(receiveAutoAssign, user) {
        const isChecked =
          user.ChannelUser.configs && typeof user.ChannelUser.configs.receiveAutoAssign === 'boolean'
            ? user.ChannelUser.configs.receiveAutoAssign
            : true;
        return (
          <span className='d-inline custom-control custom-checkbox'>
            <input type='checkbox' defaultChecked={isChecked} className='custom-control-input' />
            <label
              className='custom-control-label'
              onClick={() => {
                updateUserConfigsOfChannel({
                  channelId,
                  configs: {
                    receiveAutoAssign: !isChecked,
                  },
                  userId: user.id,
                });
                window.location.reload();
              }}
            />
          </span>
        );
      },
    },
    {
      title: 'Vai trò',
      key: 'roles',
      dataIndex: 'roles',
      render: function render(roles, user) {
        return (
          <Fragment>
            {roles.map((role) => (
              <Tag color={role.color} key={role.key}>
                {role.name}
              </Tag>
            ))}
            {canDo(me, channelId, PERMISSION_UPDATE_USER_ROLE) && (
              <Tag color='blue' onClick={openModalUpdateRole(user)}>
                <i className='fas fa-plus' />
              </Tag>
            )}
          </Fragment>
        );
      },
    },
    {
      title: 'Hành động',
      key: 'action',
      render: function render(text, user) {
        return (
          <Popconfirm title={`Xóa người dùng ${user.name} ra khỏi kênh?`} onConfirm={deleteUser(user.id)}>
            <Tag color='red'>
              <i className='far fa-trash-alt' />
            </Tag>
          </Popconfirm>
        );
      },
    },
  ].filter((column) => {
    if (['action', 'threadsCount'].includes(column.key) && !isCurrentUserAdmin) return false;
    return true;
  });

  return (
    <Fragment>
      <Table
        rowKey={(user) => user.id}
        columns={columns}
        dataSource={usersRole}
        pagination={pagination}
        loading={usersRoleFetcher.isLoading}
        onChange={onClickPaginate}
        bordered
      />
      {visibleModal && userUpdateRole && (
        <ModalUpdateRole
          activeRoles={userUpdateRole.roles}
          confirmLoading={confirmUpdateRole}
          handleCancel={cancelUpdateRole}
          handleOnChange={changeUpdateRole}
          handleSubmit={submitUpdateRole}
          name={userUpdateRole.name}
          roles={roles}
        />
      )}
    </Fragment>
  );
};

export default UserRole;
