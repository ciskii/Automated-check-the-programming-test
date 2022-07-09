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

  if (res.data) {
    console.log("res.data", res.data);
    return res.data;
  } else {
    console.log("res.data", res.data);
  }
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

const authService = {
  login,
  signup,
};

export default authService;
