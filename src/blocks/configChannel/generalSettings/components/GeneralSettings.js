import { DEFAULT_AVATAR_URL } from 'shared/constants';
import React, { Fragment } from 'react';
import { Button, Col, Container, CustomInput, Input, Row } from 'reactstrap';
import ChangeAvatar from 'shared/components/ChangeAvatar';
import { withToggle } from 'shared/hooks';
import InvitationLink from './InvitationLink';
import ManageTag from './ManageTag';
import WorkTimeSetting from './WorkTimeSetting';

const channelAvatarSize = 100;
const AUTO_ASSIGN_MODE = 'auto';
const MANUAL_ASSIGN_MODE = 'manual';

const Title = (props) => <h5 className='font-italic'>{props.children}</h5>;

const GeneralSettings = (props) => {
  const {
    channel: { id, title, configs, additionData },
    tags,
    removeTag,
    channel,
    createOrUpdateTag,
    updateChannelInfo,
    createLink,
    isChangeChannelAvatarModalShow,
    showChangeChannelAvatarModal,
    hideChangeChannelAvatarModal,
    roles,
    invitationLink,
    canCreateTag,
    canCreateInviteLink,
    canUpdateChannel,
    emitRefreshChannel,
    newAccessToken,
    updateNewAccessToken,
  } = props;

  const channelAvatarUrl = (additionData && additionData.avatarUrl) || DEFAULT_AVATAR_URL;

  const updateChannelAvatar = (avatarUrl) => () => {
    updateChannelInfo({ additionData: { avatarUrl } }).then(() => hideChangeChannelAvatarModal());
  };

  return (
    <Fragment>
      <Title>Thông tin chung</Title>
      <Container fluid>
        <Row>
          <Col xs={9} sm={4}>
            <div>Tên kênh</div>
            <Input defaultValue={title} />
          </Col>

          <Col xs={3}>
            <img
              className='rounded-circle'
              alt={title}
              src={channelAvatarUrl}
              width={channelAvatarSize}
              height={channelAvatarSize}
            />
            <Button
              color='link'
              size='sm'
              className='d-block'
              style={{ width: channelAvatarSize }}
              onClick={showChangeChannelAvatarModal}>
              <small>Thay đổi ảnh</small>
            </Button>
            <ChangeAvatar
              title={`Thay đổi ảnh đại diện kênh ${title}`}
              visible={isChangeChannelAvatarModalShow}
              onOk={updateChannelAvatar}
              onCancel={hideChangeChannelAvatarModal}
            />
          </Col>
        </Row>
      </Container>
      <hr />
      <Title>Cấu hình kênh</Title>
      <Container fluid>
        {configs && configs.hasOwnProperty('isBroadcast') && (
          <CustomInput
            id={`toggleIsBroadCastChannel${id}`}
            type='checkbox'
            label='Hiển thị tất cả phòng chat'
            checked={configs.isBroadcast}
            onChange={(e) => updateChannelInfo({ configs: { isBroadcast: e.target.checked } })}
          />
        )}
        {configs && configs.hasOwnProperty('assignMode') && (
          <CustomInput
            id={`toggleAutoAssignChannel${id}`}
            type='checkbox'
            label='Phân công tự động'
            checked={configs.assignMode === AUTO_ASSIGN_MODE}
            onChange={(e) =>
              updateChannelInfo({
                configs: {
                  assignMode: e.target.checked ? AUTO_ASSIGN_MODE : MANUAL_ASSIGN_MODE,
                },
              })
            }
          />
        )}
        {configs && configs.hasOwnProperty('assignMode') && configs.assignMode === 'auto' && (
          <CustomInput
            id={`toggleForceReceiveThreadsInWorkTime${id}`}
            type='checkbox'
            label='Luôn mở nhận phòng trong giờ làm việc'
            checked={!!configs.forceReceiveThreadsInWorkTime}
            onChange={(e) =>
              updateChannelInfo({
                configs: { forceReceiveThreadsInWorkTime: e.target.checked },
              })
            }
          />
        )}
        {configs && configs.hasOwnProperty('workTime') && (
          <WorkTimeSetting
            canUpdateChannel={canUpdateChannel}
            channel={channel}
            updateChannelInfo={updateChannelInfo}
          />
        )}
        {canUpdateChannel && (
          <Col xs={9} sm={4}>
            <div>Access Token</div>
            <Input value={newAccessToken} onChange={(e) => updateNewAccessToken(e.target.value)} />
            <button className='btn btn-sm btn-white mt-2 mr-3' onClick={() => updateNewAccessToken('')}>
              Hủy
            </button>
            <button
              className='btn btn-sm btn-primary mt-2'
              onClick={() =>
                updateChannelInfo({
                  configs: { accessToken: newAccessToken },
                })
              }>
              Lưu
            </button>
          </Col>
        )}
        <button className='btn btn-sm btn-danger mt-5' onClick={emitRefreshChannel}>
          Yêu cầu nhân viên tải lại kênh
        </button>
      </Container>
      <hr />
      <Title>Quản lý tags</Title>
      <ManageTag tags={tags} canCreateTag={canCreateTag} removeTag={removeTag} createOrUpdateTag={createOrUpdateTag} />
      <hr />
      {canCreateInviteLink && (
        <Fragment>
          <Title>Tạo link mời người dùng</Title>
          <InvitationLink roles={roles} invitationLink={invitationLink} createLink={createLink} />
        </Fragment>
      )}
    </Fragment>
  );
};

const enhance = withToggle('changeChannelAvatarModal');

export default enhance(GeneralSettings);
