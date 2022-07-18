const axios = require("axios");
const api = "http://localhost:5000/api/users/";

const login = (user, rejectWithValue) => {
  axios
    .post(
      api + "login",
      {
        email: user.email,
        password: user.password,
      },
      { withCredentials: true }
    )
    .then((res) => {
      // localStorage.setItem("loginStatus", JSON.stringify(true));
      return res.data;
    })
    .catch((error) => {
      return rejectWithValue(error.response.data.message);
    });
};

const logout = () => {
  axios({
    method: "post",
    url: api + "logout",
    withCredentials: true,
  })
    .then((res) => {
      // localStorage.removeItem("loginStatus");
      return res.data;
    })
    .catch((err) => console.log("err", err));
};

const signup = (user, rejectWithValue) => {
  axios
    .post(
      api + "signupStudent",
      {
        email: user.email,
        password: user.password,
      },
      { withCredentials: true }
    )
    .then((res) => {
      localStorage.setItem("loginStatus", JSON.stringify(true));
      return res.data;
    })

    .catch((error) => {
      return rejectWithValue(error.response.data.message);
    });
};

const checkLoggedIn = async () => {
  console.log("checkLoggedIn call");
  const res = await axios.get(api + "isLoggedIn", {
    withCredentials: true,
  });
  console.log("res", res);
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
  checkLoggedIn,
  logout,
  getMe,
};

export default authService;
