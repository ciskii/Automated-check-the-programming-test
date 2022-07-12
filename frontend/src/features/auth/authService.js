const axios = require("axios");
const api = "http://localhost:5000/api/users/";

const login = async (user) => {
  const res = await axios.post(api + "login", {
    email: user.email,
    password: user.password,
  });
  localStorage.setItem("loginStatus", JSON.stringify(true));
  return res.data;
};

const logout = async () => {
  const res = await axios({
    method: "post",
    url: api + "logout",
    withCredentials: true,
  });

  localStorage.removeItem("loginStatus");
  return res.data;
};

const signup = async (user) => {
  const res = await axios.post(api + "signup", {
    email: user.email,
    password: user.password,
  });
  console.log("res.data", res.data);
  return res.data;
};

const isLoggedIn = async () => {
  const res = await axios.get(api + "isLoggedIn");

  console.log("authService: res.status", res.status);
  if (res.status === "200") {
    return true;
  } else if (res.status === "401") {
    return false;
  }
};

const getMe = async () => {
  const res = await await axios.get(api + "getMe", {
    withCredentials: true,
  });
  console.log("res.data", res.data);
};

const authService = {
  login,
  signup,
  isLoggedIn,
  logout,
  getMe,
};

export default authService;
