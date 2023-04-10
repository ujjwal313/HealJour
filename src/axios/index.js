import axios from "axios";

const instance = axios.create({
  baseURL: "https://apitest.healjour.com/v1",
});

export default instance;
