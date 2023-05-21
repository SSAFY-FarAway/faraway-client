import axios from "axios";

axios.defaults.headers["access-token"] = sessionStorage.getItem("access-token");

export default axios.create({
  baseURL: "http://localhost",
  headers: {
    "Content-Type": "application/json;charset=utf-8",
  },
});
