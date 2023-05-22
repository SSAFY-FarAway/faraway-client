import axios from "axios";

const instance = axios.create({
  baseURL: "http://localhost",
  headers: {
    "Content-Type": "application/json;charset=utf-8",
  },
});

instance.interceptors.request.use(
  (config) => {
    const accessToken = sessionStorage.getItem("access-token");

    if (accessToken) {
      config.headers["Authorization"] = accessToken;
      config.headers["access-token"] = accessToken;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

export default instance;

// 이거 axios export 대문에 에러나는거니까 오후에 와서해 인혁아
