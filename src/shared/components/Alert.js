import { notification } from 'antd';

const config = {
  duration: 8,
};

const success = (message) => {
  notification.success({ ...config, message });
};

const error = (message) => {
  notification.error({ ...config, message });
};

export default {
  success,
  error,
};
