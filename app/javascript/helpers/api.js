import axios from "axios";
import storage from "./storage.js";
import { toast } from "react-toastify";

const BASE_URL = "/api/v1";

const login = async (data) => {
  const response = await post("/login", data);
  await storage.set("_appLogged", JSON.stringify({ logged: response.data }));
  return response;
};

const signup = async (data) => {
  const response = await post("/signup", data);
  await storage.set("_appLogged", JSON.stringify({ logged: response.data }));
  return response;
};

const getProducts = async () => {
  const response = await get("/products", null);
  return response.data.products;
};

const createOrder = async (data) => {
  const response = await post("/orders", data);
  return response.data.order;
};

const getOrder = async (id) => {
  const response = await get("/orders/" + id, null);
  return response.data.order;
};

const post = (url, data) => {
  return request("post", url, null, data);
};

const get = (url, params) => {
  return request("get", url, params);
};

const put = (url, data) => {
  return request("put", url, null, data);
};

const destroy = (url) => {
  return request("delete", url);
};

const request = (method, url, params = {}, data = {}) => {
  const client = storage.get("_appLogged");
  const accessToken =
    client && client.logged && client.logged.success
      ? client.logged.user.api_token
      : storage.get("api_token");

  const csrf = document
    .querySelector('meta[name="csrf-token"]')
    .getAttribute("content");
  const conf = {
    method: method,
    headers: {
      "X-CSRF-Token": csrf,
      "X-Shopify-Access-Token": accessToken,
      authorization: "Token " + accessToken,
      "Content-Type": "application/json",
    },
    url: BASE_URL + url,
    params: params,
    data: data,
    responseType: "json",
  };
  return axios.request(conf).then((res) => {
    if (method != "get" && !res.data.success && res.data.error) {
      toast.error(res.data.error);
      throw new Error(res.data.error);
    }
    if (res.data && res.data.success) {
      toast.success(res.data.message);
    } else if (res.data && res.data.success == false) {
      toast.error(res.data.message);
    }
    return res;
  });
};

export default {
  login,
  signup,
  getProducts,
  createOrder,
  getOrder,
};
