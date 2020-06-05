import React, { Fragment } from 'react';
import UserServing from './UserServing';

const UserServings = (props) => {
  const { users } = props;
  return (
    <Fragment>
      {users.map((user) => (
        <UserServing key={user.id} user={user} />
      ))}
    </Fragment>
  );
};

export default UserServings;
