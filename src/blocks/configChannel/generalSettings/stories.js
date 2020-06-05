import { storiesOf } from '@storybook/react';
import React from 'react';
import { Container } from 'reactstrap';
import { channel, filterTags, invitationLink, roles, usersRole } from 'storybook/sampleData';
import GeneralSettings from './components/GeneralSettings';

const emptyFunction = () => {};

storiesOf('General Settings', module)
  .add('simple show all', () => (
    <Container fluid>
      <GeneralSettings
        canCreateInviteLink
        canCreateTag
        canUpdateChannel
        me={usersRole[0]}
        onChangeExpiredTime={emptyFunction}
        invitationLink={invitationLink}
        onChangeSelectedRole={emptyFunction}
        roles={roles}
        channel={channel}
        tags={filterTags}
        createLink={emptyFunction}
        updateChannelInfo={emptyFunction}
        createOrUpdateTag={emptyFunction}
        removeTag={() => emptyFunction}
      />
    </Container>
  ))
  .add('simple no permission', () => (
    <Container fluid>
      <GeneralSettings
        canCreateInviteLink={false}
        canCreateTag={false}
        canUpdateChannel={false}
        me={usersRole[0]}
        onChangeExpiredTime={emptyFunction}
        invitationLink={invitationLink}
        onChangeSelectedRole={emptyFunction}
        roles={roles}
        channel={channel}
        tags={filterTags}
        createLink={emptyFunction}
        updateChannelInfo={emptyFunction}
        createOrUpdateTag={emptyFunction}
        removeTag={() => emptyFunction}
      />
    </Container>
  ));
