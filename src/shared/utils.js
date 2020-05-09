import moment from 'moment';

export const visualTime = (time) => {
  const isSameDay = moment().isSame(time, 'day');
  const isSameYear = moment().isSame(time, 'year');
  const formatDateString = isSameDay ? 'LT' : isSameYear ? 'DD/MM HH:mm' : 'DD/MM/YY';
  return moment(time).format(formatDateString);
};

export const upperFirst = (string) => {
  if (!string) return '';
  return string.charAt(0).toUpperCase() + string.slice(1);
};

export const unionArray = (arrArg) => {
  return arrArg.filter((elem, pos, arr) => {
    return arr.indexOf(elem) === pos;
  });
};
