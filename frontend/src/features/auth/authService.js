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
        firstName: user.firstName,
        lastName: user.lastName,
      },
      { withCredentials: true }
    )
    .then((res) => {
      return res.data;
    })

    .catch((error) => {
      return rejectWithValue(error.response.data.message);
    });
};

const checkLoggedIn = async () => {
  const res = await axios.get(api + "isLoggedIn", {
    withCredentials: true,
  });
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
