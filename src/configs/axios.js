import axios from 'axios';
import vars from 'vars';

const getCookieByName = (cname) => {
  const name = `${cname}=`;
  const decodedCookie = decodeURIComponent(document.cookie);
  const ca = decodedCookie.split(';');
  for (let i = 0; i < ca.length; i += 1) {
    let c = ca[i];
    while (c.charAt(0) === ' ') {
      c = c.substring(1);
    }
    if (c.indexOf(name) === 0) {
      return c.substring(name.length, c.length);
    }
  }
  return '';
};

const accessToken = getCookieByName('access_token');

axios.defaults.baseURL = vars.REACT_APP_BASE_SERVER_URL;
// axios.defaults.withCredentials = true;
axios.defaults.headers.common.authorization = `Bearer ${accessToken}`;

export const isSignedIn = accessToken ? true : false;
