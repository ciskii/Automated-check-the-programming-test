const axios = require("axios");
const api = "http://localhost:5000/api/users/";

const login = async (user, rejectWithValue) => {
  try {
    const res = await axios.post(
      api + "login",
      {
        email: user.email,
        password: user.password,
      },
      { withCredentials: true }
    );
    return res.data;
  } catch (err) {
    console.log("err", err);
    return rejectWithValue(err.response.data.message);
  }
};

const logout = async () => {
  const res = await axios({
    method: "post",
    url: api + "logout",
    withCredentials: true,
  });
  return res.data;
};

const signup = async (user, rejectWithValue) => {
  try {
    const res = await axios.post(
      api + "signupStudent",
      {
        email: user.email,
        password: user.password,
        firstName: user.firstName,
        lastName: user.lastName,
      },
      { withCredentials: true }
    );
    return res.data;
  } catch (err) {
    console.log("err", err);
    return rejectWithValue(err.response.data.message);
  }
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
