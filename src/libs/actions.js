import axios from "axios";

export default async baseURL => {
  const token = localStorage.getItem("token");

  const api = axios.create({
    baseURL,
    // timeout: 1000,
    // headers: {'X-Custom-Header': 'foobar'}
    headers: {
      Authorization: "Bearer " + token
    }
  });

  const { data } = await api("/actions/listActions");

  return data.reduce((memo, action) => {
    return {
      ...memo,
      [action]: async params => {
        const { data } = await api.post(`/${action}`, params).catch(e => {
          throw new Error(e.response.data);
        });
        return data;
      }
    };
  }, {});
};
