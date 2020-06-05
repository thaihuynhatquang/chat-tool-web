import { PERMISSION_CREATE_INVITE_LINK, PERMISSION_CREATE_TAG, PERMISSION_UPDATE_CHANNEL } from 'shared/constants';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import { compose, mapProps, withHandlers, withProps, withStateHandlers } from 'recompose';
import * as storeGetter from 'shared/getEntities';
import { withFetcher, withLoading } from 'shared/hooks';
import { canDo } from 'shared/utils';
import GeneralSettings from './components/GeneralSettings';
import * as services from './services';

const mapState = (state) => ({
  me: storeGetter.getMe(state),
});
const mapDispatch = (dispatch) => ({});

const enhance = compose(
  connect(mapState, mapDispatch),
  withRouter,
  withProps((props) => ({
    channelId: parseInt(props.match.params.channelId),
  })),
  withStateHandlers(
    {
      invitationLink: '',
      channel: undefined,
      tags: [],
      roles: [],
      newAccessToken: '',
    },
    {
      updateInvitationLink: (state) => (invitationLink) => ({
        ...state,
        invitationLink,
      }),
      updateStateChannel: (state) => (channel) => ({ ...state, channel }),
      updateRoles: (state) => (roles) => ({ ...state, roles }),
      updateTags: (state) => (tags) => ({ ...state, tags }),
      addTag: (state) => (tag) => ({ ...state, tags: [...state.tags, tag] }),
      _removeTag: (state) => (id) => ({
        ...state,
        tags: state.tags.filter((tag) => tag.id !== id),
      }),
      editTag: (state) => (tag) => ({
        ...state,
        tags: state.tags.map((_tag) => (_tag.id === tag.id ? tag : _tag)),
      }),
      updateNewAccessToken: (state) => (newValue) => ({
        ...state,
        newAccessToken: newValue,
      }),
    },
  ),
  withLoading((props) => !props.me),
  withFetcher(
    'channel',
    async (props) => {
      const { channelId } = props;
      const [channel, roles, tags] = await Promise.all([
        services.fetchChannel(channelId),
        services.fetchRoleByChannel(channelId),
        services.fetchTagByChannel(channelId),
      ]);
      props.updateStateChannel(channel);
      props.updateRoles(roles);
      props.updateTags(tags);
      return channel;
    },
    {
      fetchOnMount: true,
    },
  ),
  withLoading((props) => props.channelFetcher.isLoading || !props.channelFetcher.data),
  withHandlers({
    updateChannelInfo: (props) => async (updateInfo) => {
      const { channelId } = props;
      const channel = await services.updateChannelInfo(channelId, updateInfo);
      props.updateStateChannel(channel);
      return channel;
    },
    createLink: (props) => (input) => async (e) => {
      const { channelId } = props;
      const { selectedRoleIds, expiredTime } = input;

      if (expiredTime < 0) throw new Error('Chọn lại ngày khác!');
      const { link } = await services.createInviteLink(channelId, selectedRoleIds, expiredTime);

      props.updateInvitationLink(link);
    },
    createOrUpdateTag: (props) => async (inputTag) => {
      const { channelId } = props;

      if (!inputTag.content) {
        return;
      }

      if (inputTag.tagId) {
        const tag = await services.updateTag(inputTag.tagId, inputTag);
        props.editTag(tag);
        return;
      }

      const tag = await services.createTag(channelId, inputTag);
      props.addTag(tag);
    },
    removeTag: (props) => (tagId) => async (e) => {
      e.stopPropagation();
      await services.removeTag(tagId);
      props._removeTag(tagId);
    },
    emitRefreshChannel: (props) => () => {
      const { channelId } = props;
      services.emitRefreshChannel(channelId);
    },
  }),
  mapProps((props) => {
    const { channelId, me } = props;
    const { channelFetcher, updateStateChannel, _removeTag, ...rest } = props;

    const canCreateInviteLink = canDo(me, channelId, PERMISSION_CREATE_INVITE_LINK);

    const canCreateTag = canDo(me, channelId, PERMISSION_CREATE_TAG);

    const canUpdateChannel = canDo(me, channelId, PERMISSION_UPDATE_CHANNEL);
    return {
      canCreateInviteLink,
      canCreateTag,
      canUpdateChannel,
      ...rest,
    };
  }),
);

export default enhance(GeneralSettings);
