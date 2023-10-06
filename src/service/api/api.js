import axios from "axios";
import jwt_decode from "jwt-decode";
import Cookies from "js-cookie";

const client = axios.create({});
const getToken = async () => {
  let newToken = "";
  await axios
    .get(process.env.REACT_APP_API_URL + "/get-api-token")
    .then(async (res) => {
      newToken = res?.data?.result?.token;
      Cookies.set("apiToken", newToken);
    });
  return newToken;
};

client.interceptors.request.use(
  async (config) => {
    let token = Cookies.get("apiToken");
    let currentDate = new Date();
    let decodedToken = "";
    try {
      if (token) {
        decodedToken = jwt_decode(token);
      }
    } catch {
      decodedToken = "";
    }
    if (!token) {
      token = await getToken();
    } else if (
      decodedToken &&
      decodedToken.exp * 1000 - 10000 < currentDate.getTime()
    ) {
      token = await getToken();
    }
    config.headers["authorization"] = token;
    return config;
  },
  (error) => {
    Promise.reject(error);
  }
);

const makeAuthorizedRequest = async function (options) {
  const onSuccess = function (response) {
    return response;
  };

  const onError = function (error) {
    return Promise.reject(error);
  };

  try {
    const response = await client(options);
    return onSuccess(response);
  } catch (error) {
    return onError(error);
  }
};

export default makeAuthorizedRequest;
