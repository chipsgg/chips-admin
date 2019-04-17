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
  console.log(data);

  return data.reduce((memo, action) => {
    return {
      ...memo,
      [action]: async params => {
        const { data } = await api.post(`/${action}`, params);
        return data;
      }
    };
  }, {});
};
