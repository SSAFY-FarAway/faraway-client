import axios from "axios";

axios.defaults.headers.common["access-token"] = sessionStorage.getItem("access-token");

export default axios.create({
  baseURL: "http://localhost",
  headers: {
    "Content-Type": "application/json;charset=utf-8",
    Authorization: sessionStorage.getItem("access-token"),
  },
});
