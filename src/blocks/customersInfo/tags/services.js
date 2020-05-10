// @flow
import axios from 'axios'
import type { ResponseT } from 'types'

type CustomerAndTagT = {
  customerId: number,
  tagId: number
}

export const fetchTags = ({
  content = ''
}: {
  content?: string
}): Promise<ResponseT> =>
  axios.get(`/api/v1/tags`, { params: { content } }).then(res => res.data)

export const addTagToCustomer = ({
  customerId,
  tagId
}: CustomerAndTagT): Promise<*> =>
  axios
    .post(`/api/v1/customers/${customerId}/tags`, { tagId })
    .then(res => res.data)

export const removeTagFromCustomer = ({
  customerId,
  tagId
}: CustomerAndTagT): Promise<*> =>
  axios
    .delete(`/api/v1/customers/${customerId}/tags/${tagId}`)
    .then(res => res.data)
