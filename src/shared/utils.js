import moment from 'moment';
export const generate_random_string = (string_length = 40) => {
  let random_string = '';
  let random_ascii;
  for (let i = 0; i < string_length; i++) {
    random_ascii = Math.floor(Math.random() * 25 + 97);
    random_string += String.fromCharCode(random_ascii);
  }
  return random_string;
};
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

export const numberWithCommas = (x) => {
  if (!x && typeof x !== 'number') return x;
  return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',');
};

export const unionArray = (arrArg) =>
  arrArg.filter((elem, pos, arr) => {
    return arr.indexOf(elem) === pos;
  });

export const replaceVietnameseChar = (str) => {
  str = str.replace(/à|á|ạ|ả|ã|â|ầ|ấ|ậ|ẩ|ẫ|ă|ằ|ắ|ặ|ẳ|ẵ/g, 'a');
  str = str.replace(/è|é|ẹ|ẻ|ẽ|ê|ề|ế|ệ|ể|ễ/g, 'e');
  str = str.replace(/ì|í|ị|ỉ|ĩ/g, 'i');
  str = str.replace(/ò|ó|ọ|ỏ|õ|ô|ồ|ố|ộ|ổ|ỗ|ơ|ờ|ớ|ợ|ở|ỡ/g, 'o');
  str = str.replace(/ù|ú|ụ|ủ|ũ|ư|ừ|ứ|ự|ử|ữ/g, 'u');
  str = str.replace(/ỳ|ý|ỵ|ỷ|ỹ/g, 'y');
  str = str.replace(/đ/g, 'd');
  str = str.replace(/À|Á|Ạ|Ả|Ã|Â|Ầ|Ấ|Ậ|Ẩ|Ẫ|Ă|Ằ|Ắ|Ặ|Ẳ|Ẵ/g, 'A');
  str = str.replace(/È|É|Ẹ|Ẻ|Ẽ|Ê|Ề|Ế|Ệ|Ể|Ễ/g, 'E');
  str = str.replace(/Ì|Í|Ị|Ỉ|Ĩ/g, 'I');
  str = str.replace(/Ò|Ó|Ọ|Ỏ|Õ|Ô|Ồ|Ố|Ộ|Ổ|Ỗ|Ơ|Ờ|Ớ|Ợ|Ở|Ỡ/g, 'O');
  str = str.replace(/Ù|Ú|Ụ|Ủ|Ũ|Ư|Ừ|Ứ|Ự|Ử|Ữ/g, 'U');
  str = str.replace(/Ỳ|Ý|Ỵ|Ỷ|Ỹ/g, 'Y');
  str = str.replace(/Đ/g, 'D');
  return str;
};

export const canDo = (me, channelId, permission) => {
  if (!me || !channelId) return false;
  return me.roles
    .filter((role) => role.channelId === channelId)
    .reduce((acc, role) => {
      const permissionKeys = role.permissions ? role.permissions.map((permission) => permission.key) : [];
      return [...acc, ...permissionKeys];
    }, [])
    .includes(permission);
};

export const isDevelopment = process.env.NODE_ENV !== 'production';
