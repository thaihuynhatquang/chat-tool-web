import DatePicker from 'antd/lib/date-picker';
import locale from 'antd/lib/date-picker/locale/vi_VN';
import Select from 'antd/lib/select';
import TagAntd from 'antd/lib/tag';
import moment from 'moment';
import React from 'react';
import { Col, Container, Row } from 'reactstrap';
import { compose, withHandlers, withStateHandlers } from 'recompose';
import { withCopyClipboard } from 'shared/hooks';

const Option = Select.Option;

const WrapCopyLink = withCopyClipboard((props) => {
  return <span className='cursor-pointer text-primary'>{props.text}</span>;
});

const InvitationLink = (props) => {
  const { invitationLink, onChangeExpiredTime, onChangeSelectedRole, roles, createLinkAndResetClipBoard } = props;

  return (
    <Container fluid>
      <Row className='d-flex'>
        <Col md={4}>
          <Select
            mode='multiple'
            style={{ width: '100%' }}
            onChange={onChangeSelectedRole}
            placeholder='Chọn quyền cho người dùng'>
            {roles.map((role) => (
              <Option key={role.id}>
                <TagAntd color={role.color}>{role.name}</TagAntd>
              </Option>
            ))}
          </Select>
        </Col>
        <DatePicker
          showTime
          defaultValue={moment()
            .add('3', 'day')
            .startOf('day')}
          className='mx-2 px-2'
          format='YYYY-MM-DD HH:mm:ss'
          disabledDate={(current) => current && current < moment().startOf('day')}
          locale={locale}
          placeholder='Chọn ngày hết hạn'
          onChange={onChangeExpiredTime}
        />
        <div className='btn btn-link d-inline-block'>
          <small onClick={createLinkAndResetClipBoard}>Tạo link</small>
        </div>
      </Row>
      {invitationLink && (
        <Row>
          <Col md={12}>Link mời người dùng: </Col>
          <Col md={6} className='border p-1 mx-3 my-1' style={{ wordWrap: 'break-word' }}>
            <WrapCopyLink text={invitationLink} />
          </Col>
        </Row>
      )}
    </Container>
  );
};

const enhance = compose(
  withStateHandlers(
    { expiredTime: 3 * 24 * 3600, selectedRoleIds: [] },
    {
      updateExpiredTime: (state) => (expiredTime = 3 * 24 * 3600) => ({
        ...state,
        expiredTime,
      }),
      updateSelectedRoleIds: (state) => (selectedRoleIds) => ({
        ...state,
        selectedRoleIds,
      }),
    },
  ),
  withHandlers({
    onChangeSelectedRole: (props) => (roleIds) => {
      props.updateSelectedRoleIds(roleIds.map(parseInt));
    },
    onChangeExpiredTime: (props) => (momentDate) => {
      if (!momentDate) {
        props.updateExpiredTime();
        return;
      }
      const expiredTime = momentDate.diff(moment(), 'seconds');
      props.updateExpiredTime(expiredTime);
    },
    createLinkAndResetClipBoard: (props) => async (e) => {
      const input = {
        expiredTime: props.expiredTime,
        selectedRoleIds: props.selectedRoleIds,
      };
      await props.createLink(input)(e);
    },
  }),
);

export default enhance(InvitationLink);
