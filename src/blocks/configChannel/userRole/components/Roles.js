import Checkbox from 'antd/lib/checkbox';
import React from 'react';
const CheckboxGroup = Checkbox.Group;

const ModalUpdateRole = (props) => {
  const { roles, activeRoles, handleOnChange } = props;

  const plainOptions = roles.map((role) => ({
    label: role.name,
    value: role.id,
  }));

  const defaultValues = activeRoles.map((role) => role.id);

  return (
    <CheckboxGroup
      className='d-flex flex-column'
      options={plainOptions}
      defaultValue={defaultValues}
      onChange={handleOnChange}
    />
  );
};
export default ModalUpdateRole;
