import { client } from 'configs/axios';

export const updateTransferThreadStatus = (transferThreadId, status) =>
  client.put(`/api/v1/transfer-threads/${transferThreadId}`, { status });
