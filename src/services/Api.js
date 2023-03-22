import axios from "axios";

const apiUrl = "http://localhost:8080/api";

const Api = axios.create({
  baseURL: apiUrl,
});

export default Api;
