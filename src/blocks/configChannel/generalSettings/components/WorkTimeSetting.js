import classNames from 'classnames';
import React from 'react';
import { compose, mapProps, withHandlers, withStateHandlers } from 'recompose';

const WorkTimeSetting = (props) => {
  const {
    isChangeWorkTime,
    workTimeState,
    addWorkTime,
    updateTime,
    updateWeekInWorkTime,
    removeWorkTime,
    resetWorkTimeState,
    updateChannelInfo,
    canUpdateChannel,
  } = props;

  const workingStateValid = workTimeState.every(
    ({ start, end }) => /^\d{2}:\d{2}$/.test(start) && start < end && /^\d{2}:\d{2}$/.test(end),
  );

  return (
    <div className='pl-4'>
      <div className='mb-1'>
        Giờ làm việc
        {canUpdateChannel && <i className='far fa-plus-square text-success ml-2' onClick={addWorkTime} />}
      </div>
      {workTimeState.map(({ start, end, week }, idx) => {
        const isValidStart = /^\d{2}:\d{2}$/.test(start) && start < end;
        const isValidEnd = /^\d{2}:\d{2}$/.test(end) && start < end;
        return (
          <div className='form-inline pb-1' key={idx}>
            <input
              type='text'
              name='start'
              className={classNames('form-control form-control-sm', {
                'is-valid': isValidStart,
                'is-invalid': !isValidStart,
              })}
              value={start}
              onChange={updateTime(idx)}
              style={{ width: 85 }}
            />
            <small className='px-2'>-</small>
            <input
              type='text'
              name='end'
              className={classNames('form-control form-control-sm', {
                'is-valid': isValidEnd,
                'is-invalid': !isValidEnd,
              })}
              value={end}
              onChange={updateTime(idx)}
              style={{ width: 85 }}
            />
            <div className='btn-group ml-3' role='group'>
              {week.map((day, dayIndex) => (
                <button
                  key={dayIndex}
                  type='button'
                  className={classNames('btn btn-sm border border-light', {
                    'btn-light': !day,
                    'btn-primary': day,
                  })}
                  onClick={updateWeekInWorkTime(idx, dayIndex)}>
                  {dayIndex === week.length - 1 ? 'CN' : `T${dayIndex + 2}`}
                </button>
              ))}
            </div>
            {canUpdateChannel && (
              <i className='fas fa-trash text-secondary ml-3 cursor-pointer' onClick={removeWorkTime(idx)} />
            )}
          </div>
        );
      })}
      {canUpdateChannel && isChangeWorkTime && (
        <div className='mt-1'>
          <button className='btn btn-sm btn-light mr-2' onClick={resetWorkTimeState}>
            Hủy
          </button>
          <button
            disabled={!workingStateValid}
            className='btn btn-sm btn-success mr-2'
            onClick={() =>
              updateChannelInfo({ configs: { workTime: workTimeState } }).then(() => resetWorkTimeState())
            }>
            Lưu
          </button>
        </div>
      )}
    </div>
  );
};

const enhance = compose(
  withStateHandlers(
    (props) => ({
      workTimeState: (props.channel.configs && props.channel.configs.workTime) || [],
      isChangeWorkTime: false,
    }),
    {
      _updateWorkTimeState: ({ workTimeState }) => (nextWorkTimeState) => {
        return { workTimeState: nextWorkTimeState, isChangeWorkTime: true };
      },
      resetWorkTimeState: (state, props) => () => ({
        workTimeState: (props.channel.configs && props.channel.configs.workTime) || [],
        isChangeWorkTime: false,
      }),
    },
  ),
  withHandlers({
    addWorkTime: (props) => () => {
      const nextWorkTimeState = [
        {
          start: '00:00',
          end: '05:00',
          week: [false, false, false, false, false, false, false],
        },
        ...props.workTimeState,
      ];
      props._updateWorkTimeState(nextWorkTimeState);
    },

    updateTime: (props) => (updatePosition) => (e) => {
      const nextWorkTimeState = props.workTimeState.map((workTime, idx) => {
        if (idx !== updatePosition) return workTime;
        return {
          ...workTime,
          [e.target.name]: e.target.value,
        };
      });
      props._updateWorkTimeState(nextWorkTimeState);
    },
    removeWorkTime: (props) => (updatePosition) => () => {
      const nextWorkTimeState = props.workTimeState.filter((workTime, idx) => idx !== updatePosition);
      props._updateWorkTimeState(nextWorkTimeState);
    },
    updateWeekInWorkTime: (props) => (updatePosition, dayPostion) => () => {
      const nextWorkTimeState = props.workTimeState.map((workTime, idx) => {
        if (idx !== updatePosition) return workTime;
        const nextWeekInWorkTime = workTime.week.map((day, dayIdx) => {
          if (dayIdx !== dayPostion) return day;
          return !day;
        });
        return {
          ...workTime,
          week: nextWeekInWorkTime,
        };
      });
      props._updateWorkTimeState(nextWorkTimeState);
    },
  }),
  mapProps(({ _updateTime, ...rest }) => rest),
);

export default enhance(WorkTimeSetting);
