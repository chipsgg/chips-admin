import axios from "axios";

export default baseURL => {
  const token = localStorage.getItem("token");

  const api = axios.create({
    baseURL,
    // timeout: 1000,
    // headers: {'X-Custom-Header': 'foobar'}
    headers: {
      Authorization: "Bearer " + token
    }
  });

  // token, login, password
  return {
    async login(params) {
      const { data } = await api.post(`/local/login`, params);
      return data;
    },
    async signup(params) {
      const { data } = await api.post(`/local/signup`, params);
      return data;
    },
    async logout(params) {
      localStorage.setItem('token', null)
      location.reload()
    }
  };
};
