import axios from 'axios';

export const getProducts = ({ searchText, order, orderBy, nextPage, requestKey }) =>
  axios
    .get('/api/v1/stocks', {
      params: {
        searchText,
        order,
        orderBy,
        nextPage,
      },
    })
    .then((res) => ({ ...res.data, requestKey }));
