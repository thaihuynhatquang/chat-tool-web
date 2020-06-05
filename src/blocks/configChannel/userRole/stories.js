import { storiesOf } from '@storybook/react';
import { PERMISSION_UPDATE_USER_ROLE, PERMISSION_REMOVE_USER_FROM_CHANNEL } from 'shared/constants';
import React from 'react';
import { roles, usersRole } from 'storybook/sampleData';
import Roles from './components/Roles';
import UserRole from './components/UserRole';

const addRole = (userId) => () => alert(`Click addRole, ${userId}`);
const deleteUser = (userId) => () => alert(`Click deleteUser, ${userId}`);

const emptyFunction = () => {};
storiesOf('UserRole', module)
  .add('user role loading', () => (
    <UserRole
      roles={[]}
      channelId={1}
      usersRole={usersRole}
      me={usersRole[0]}
      openModalUpdateRole={() => emptyFunction}
      onClickPaginate={emptyFunction}
      pagination={{ current: 0, total: usersRole.length }}
      usersRoleFetcher={{
        isLoading: true,
        data: null,
      }}
      toggleModalUpdateRole={addRole}
      deleteUser={deleteUser}
      cancelUpdateRole={emptyFunction}
      changeUpdateRole={emptyFunction}
      confirmUpdateRole={false}
      submitUpdateRole={emptyFunction}
      userUpdateRole={null}
      visibleModal={false}
    />
  ))
  .add('user role', () => (
    <UserRole
      roles={[]}
      channelId={1}
      openModalUpdateRole={() => emptyFunction}
      onClickPaginate={emptyFunction}
      pagination={{ current: 0, total: usersRole.length }}
      usersRoleFetcher={{
        isLoading: false,
      }}
      usersRole={usersRole}
      me={usersRole[0]}
      toggleModalUpdateRole={addRole}
      deleteUser={deleteUser}
      cancelUpdateRole={emptyFunction}
      changeUpdateRole={emptyFunction}
      confirmUpdateRole={false}
      submitUpdateRole={emptyFunction}
      userUpdateRole={null}
      visibleModal={false}
    />
  ))
  .add('user role has permission', () => (
    <UserRole
      roles={[]}
      channelId={1}
      usersRole={usersRole}
      me={usersRole[0]}
      openModalUpdateRole={() => emptyFunction}
      onClickPaginate={emptyFunction}
      pagination={{ current: 0, total: usersRole.length }}
      usersRoleFetcher={{
        isLoading: false,
        data: usersRole.map((user) => ({
          ...user,
          roles: user.roles.map((role) => ({
            ...role,
            permissions: [{ key: PERMISSION_UPDATE_USER_ROLE }, { key: PERMISSION_REMOVE_USER_FROM_CHANNEL }],
          })),
        })),
      }}
      toggleModalUpdateRole={addRole}
      deleteUser={deleteUser}
      cancelUpdateRole={emptyFunction}
      changeUpdateRole={emptyFunction}
      confirmUpdateRole={false}
      submitUpdateRole={emptyFunction}
      userUpdateRole={null}
      visibleModal={false}
    />
  ))
  .add('Role row in modal', () => <Roles roles={roles} activeRoles={roles.slice(2)} handleOnChange={emptyFunction} />);
