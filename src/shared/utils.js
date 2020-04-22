import moment from 'moment';

export const visualTime = (time) => {
  const isSameDay = moment().isSame(time, 'day');
  const isSameYear = moment().isSame(time, 'year');
  const formatDateString = isSameDay ? 'LT' : isSameYear ? 'DD/MM HH:mm' : 'DD/MM/YY';
  return moment(time).format(formatDateString);
};
