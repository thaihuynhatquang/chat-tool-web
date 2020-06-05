import axios from 'axios';

export const updateTransferThreadStatus = (transferThreadId, status) =>
  axios.put(`/api/v1/transfer-threads/${transferThreadId}`, { status });
