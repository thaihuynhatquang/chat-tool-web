import React from 'react';
import { withState, compose, withHandlers } from 'recompose';
import PopupStatusThread from 'blocks/popupStatusThread';
const enhance = compose(
  withState('visible', 'setVisible', false),
  withHandlers({
    onOpenModal: (props) => (e) => {
      e.stopPropagation();
      props.setVisible(true);
    },
    confirmFunction: (props) => ({ cause }) => (e) => {
      e.stopPropagation();
      props.onConfirm({ cause })(e);
    },
  }),
);

export default (Component) =>
  enhance((props) => {
    return (
      <React.Fragment>
        <Component {...props} />
        <PopupStatusThread {...props} />
      </React.Fragment>
    );
  });
