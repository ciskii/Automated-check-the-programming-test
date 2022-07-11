const axios = require("axios");
const api = "http://localhost:5000/api/users/";

const login = async (user) => {
  const res = await axios.post(
    api + "login",
    {
      email: user.email,
      password: user.password,
    },
    {
      withCredentials: true, // Now this is was the missing piece in the client side
    }
  );
  localStorage.setItem("loginStatus", JSON.stringify(true));
  console.log("res", res);
  return res.data;
};

const signup = async (user) => {
  const res = await axios.post(api + "signup", {
    email: user.email,
    password: user.password,
  });

  if (res.data) {
    console.log("res.data", res.data);
  } else {
    console.log("res.data", res.data);
  }
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

const authService = {
  login,
  signup,
  isLoggedIn,
};

export default authService;
