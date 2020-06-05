export const LOGOUT = 'LOGOUT';
export const UPDATE_USER_INFO = 'UPDATE_USER_INFO';

export const updateUserInfoSucceed = ({ data, norm }) => ({
  type: UPDATE_USER_INFO,
  data,
  norm,
});
export const logout = () => ({ type: LOGOUT });
