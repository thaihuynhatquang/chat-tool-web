import { connect } from 'react-redux';
import { compose, mapProps, withHandlers, withState } from 'recompose';
import * as storeGetter from 'shared/getEntities';
import { withFetcher, withLoading } from 'shared/hooks';
import UserRole from './components/UserRole';
import { deleteUserFromChannel, fetchUsersRole, getRolesChannel, updateUsersRole } from './services';

const LIMIT_USER_ROLE = 10;
const mapState = (state) => ({
  me: storeGetter.getMe(state),
});
const mapDispatch = (dispatch) => ({});

const enhance = compose(
  connect(mapState, mapDispatch),
  withState('roles', 'setRoles', []),
  withState('current', 'setCurrent', 1),
  withState('usersRole', 'setUsersRole', []),
  withState('updateRoles', 'setUpdateRoles', []),
  withState('userUpdateRole', 'setUserUpdateRole', null),
  withState('visibleModal', 'setVisibleModal', false),
  withState('confirmUpdateRole', 'setConfirmUpdateRole', false),
  withState('pagination', 'setPagination', {
    total: 0,
    pageSize: LIMIT_USER_ROLE,
  }),
  withFetcher(
    'roles',
    async (props) => {
      const {
        match: {
          params: { channelId },
        },
      } = props;
      const { data: roles } = await getRolesChannel({ channelId });
      props.setRoles(roles);
      return roles;
    },
    { fetchOnMount: true },
  ),
  withFetcher(
    'usersRole',
    async (props) => {
      const {
        match: {
          params: { channelId },
        },
      } = props;
      const input = {
        channelId: channelId,
        limit: LIMIT_USER_ROLE,
        offset: LIMIT_USER_ROLE * (props.current - 1),
      };

      const usersRole = await fetchUsersRole(input);

      props.setUsersRole(usersRole.data);
      props.setPagination({
        ...props.pagination,
        total: usersRole.count,
      });
      return usersRole.data;
    },
    {
      fetchOnMount: true,
      fetchOnPropsChange: ['current', 'pagination.total'],
    },
  ),
  withLoading((props) => !props.me || !props.roles),
  withHandlers({
    openModalUpdateRole: (props) => (user) => () => {
      props.setUserUpdateRole(user);
      props.setVisibleModal(true);
    },
    deleteUser: (props) => (userId) => async () => {
      const {
        match: {
          params: { channelId },
        },
      } = props;

      await deleteUserFromChannel({
        channelId: parseInt(channelId),
        userId,
      });

      props.setPagination({
        ...props.pagination,
        total: props.pagination.total - 1,
      });
    },
    onClickPaginate: (props) => (pagination) => {
      props.setPagination({
        ...props,
        pagination,
      });

      props.setCurrent(pagination.current);
    },
    cancelUpdateRole: (props) => () => {
      props.setVisibleModal(false);
    },
    changeUpdateRole: (props) => (activeRoleKeys) => {
      props.setUpdateRoles(activeRoleKeys);
    },
    submitUpdateRole: (props) => async (e) => {
      e.preventDefault();
      try {
        const {
          match: {
            params: { channelId },
          },
        } = props;
        props.setConfirmUpdateRole(true);
        const userId = props.userUpdateRole.id;

        await updateUsersRole({
          userId,
          roleIds: props.updateRoles,
          channelId: parseInt(channelId),
        });

        const { usersRole } = props;
        const newUserRole = usersRole.map((user) =>
          user.id !== userId
            ? user
            : {
                ...user,
                roles: props.roles.filter((role) => props.updateRoles.find((activeRoleId) => activeRoleId === role.id)),
              },
        );

        props.setUsersRole(newUserRole);
      } catch (error) {
        throw error;
      } finally {
        props.setConfirmUpdateRole(false);
        props.setVisibleModal(false);
      }
    },
  }),
  mapProps((props) => {
    const {
      rolesFetcher,
      setRoles,
      updateRoles,
      setUpdateRoles,
      current,
      setCurrent,
      setPagination,
      history,
      location,
      match,
      setUsersRole,
      setUserUpdateRole,
      setVisibleModal,
      setConfirmUpdateRole,
      ...rest
    } = props;
    const {
      params: { channelId },
    } = match;
    return {
      ...rest,
      channelId: parseInt(channelId),
    };
  }),
);

export default enhance(UserRole);
