import React from 'react';
import { Col, Container, Row } from 'reactstrap';
import { compose } from 'recompose';
import NavLink from './navLink';

const withConfigChannelLayout = (Component) =>
  function ConfigChannelLayout(props) {
    return (
      <Container fluid>
        <Row className='h-100'>
          <Col xs={3} className='border-right'>
            <NavLink channelId={props.match.params.channelId} {...props} />
          </Col>
          <Col xs={9} style={{ overflowY: 'auto' }}>
            <Container className='my-3' fluid>
              <Component {...props} />
            </Container>
          </Col>
        </Row>
      </Container>
    );
  };

const enhance = compose(withConfigChannelLayout);

export default enhance;
