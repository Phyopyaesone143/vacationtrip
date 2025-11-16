import axios from "axios";
import host from "./host";

const API = axios.create({
  baseURL: `${host}/api`,
});

export default API;
