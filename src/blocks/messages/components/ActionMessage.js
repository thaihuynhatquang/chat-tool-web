import classnames from 'classnames';
import { MESSAGE } from 'shared/constants';
import React from 'react';
import { compose, withHandlers, withStateHandlers } from 'recompose';

const PROCESS = 'Xử lý';
const UNPROCESS = 'Đã xử lý';

const ActionMessage = (props) => {
  const { handleClearMiss, loading, processText } = props;
  return (
    <React.Fragment>
      <small
        className={classnames('pl-2 btn-link font-weight-bold cursor-pointer text-secondary', {
          disabled: loading,
        })}
        onClick={handleClearMiss}>
        <i
          className={classnames('far', {
            'fa-eye': processText === PROCESS,
            'fa-eye-slash': processText === UNPROCESS,
          })}
        />{' '}
        {processText}
        {loading && <i className={`ml-1 fas fa-circle-notch fa-spin`} />}
      </small>
    </React.Fragment>
  );
};

const enhance = compose(
  withStateHandlers(
    (props) => ({
      loading: false,
      processText: !props.processed ? PROCESS : UNPROCESS,
    }),
    {
      setLoading: (state) => (loading) => ({ ...state, loading }),
      setProcessText: (state) => (isProcessed) => ({
        ...state,
        processText: isProcessed ? PROCESS : UNPROCESS,
      }),
    },
  ),
  withHandlers({
    handleClearMiss: (props) => async () => {
      const { mid, clearMiss, loading, setLoading, setProcessText, processed } = props;
      if (clearMiss && !loading) {
        setLoading(true);
        await clearMiss({
          id: mid,
          type: MESSAGE,
        })();
        setProcessText(processed ? true : false);
        setLoading(false);
      }
    },
  }),
);
export default enhance(ActionMessage);
