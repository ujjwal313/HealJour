import axios  from "axios";

const instance = axios.create({
  baseURL: "http://localhost:3500/v1",
});

export default instance;
