import React from 'react';
import axios from 'axios';
import Alert from 'shared/components/Alert';
import vars from 'vars';

export const baseURL = vars.REACT_APP_API_URL;

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

export const accessToken = getCookieByName('access_token');

const client = axios.create({
  baseURL,
  // transformRequest: [(data) => _.decamelizeKeys(data), ...axios.defaults.transformRequest],
  // transformResponse: [...axios.defaults.transformResponse, (data) => _.camelizeKeys(data)],
  // paramsSerializer: (params) => Qs.stringify(_.decamelizeKeys(params), { arrayFormat: "brackets" }),
});

const controlError = (error) => {
  if (!error.response) {
    Alert.error('Kết nối đến Server thất bại');
  } else {
    if (error.response.status === 401) {
      document.cookie = `access_token=; Path=/; Expires=Thu, 01 Jan 1970 00:00:01 GMT;`;
      window.location.href = `${process.env.REACT_APP_IAM_SERVER_URL || ''}`;
    }

    if (error.response.status < 500) {
      let errorData;

      if (error.response.data instanceof ArrayBuffer) {
        let decodedString = String.fromCharCode.apply(null, new Uint8Array(error.response.data));
        errorData = JSON.parse(decodedString);
      } else {
        errorData = error.response.data;
      }

      const { message, error: identity } = errorData;
      if (message) {
        Alert.error(message);
      } else if (identity) {
        Alert.error(
          <div>
            {identity.code && <div>{`${identity.code} - ${identity.status}`}</div>}
            <div style={{ color: 'gray' }}>{`${identity.message}`}</div>
          </div>,
        );
      }
    } else {
      Alert.error(`Xuất hiện lỗi trên Server`);
    }
  }
  return Promise.reject(error);
};
client.interceptors.response.use((response) => response, controlError);
client.interceptors.request.use(
  (config) => {
    config.headers.Authorization = `Bearer ${accessToken}`;
    return config;
  },
  (error) => Promise.reject(error),
);

export { client };
