import axios from "axios";

const callApi = async (method, path, data, jwt, params = {}) => {
  const headers = {
    Authorization: `Bearer ${jwt}`,
    "Content-Type": "application/json",
  };
  const baseUrl = "http://127.0.0.1:8000/api/v1";
  const fullUrl = `${baseUrl}${path}`;
  if (method === "get" || method === "delete") {
    return axios[method](fullUrl, { headers, params });
  } else {
    return axios[method](fullUrl, data, { headers });
  }
};

export default {
  GOOGLE_PLACES_API_KEY: "AIzaSyArYM2tY8P0JfCqG4IAgFXBHEKo7OsfZZg",

  createAccount: (form) => callApi("post", "/accounts/", form),
  login: (form) => callApi("post", "/accounts/login/", form),

  createSupplies: (id, token, form) =>
    callApi("post", `/checks/${id}/new/`, form, token),
  searchSupply: (form) => callApi("post", "/checks/search/")

  dateSend: (form) => callApi("post", "/utilities/date/", form),
  placeSend: (form) => callApi("post", "/utilities/place/", form),
  // rooms: (page = 1, token) =>
  //   callApi("get", `/rooms/?page=${page}`, null, token),
  // favs: (id, token) => callApi("get", `/users/${id}/favs/`, null, token),
  // toggleFavs: (userId, roomId, token) =>
  //   callApi("put", `/users/${userId}/favs/`, { pk: roomId }, token),
  // search: (form, token) => callApi("get", "/rooms/search/", null, token, form),
};
