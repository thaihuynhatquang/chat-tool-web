import React from 'react';
import { compose, mapProps } from 'recompose';
import { withChangeStatusThread } from 'shared/hooks';

const ThreadCloseButton = withChangeStatusThread((props) => {
  return (
    <div className='py-2 px-3 bg-success' onClick={props.onOpenModal}>
      <i className='fas fa-check text-white' />
    </div>
  );
});

const ActionThread = (props) => {
  const { onCloseThread, onProcessThread, isShowActionProcessThread } = props;
  return (
    <React.Fragment>
      {isShowActionProcessThread && (
        <div className='py-2 px-3 bg-warning' onClick={onProcessThread}>
          <i className='fas fa-eye text-white' />
        </div>
      )}

      <ThreadCloseButton onConfirm={onCloseThread} />
    </React.Fragment>
  );
};
const enhance = compose(
  mapProps((props) => {
    return {
      ...props,
      isShowActionProcessThread: props.missCount !== 0,
    };
  }),
);
export default enhance(ActionThread);
