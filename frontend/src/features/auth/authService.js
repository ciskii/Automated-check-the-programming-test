const axios = require("axios");
const api = "http://localhost:5000/api/users/";

const login = async (user, rejectWithValue) => {
  try {
    await axios
      .post(
        api + "login",
        {
          email: user.email,
          password: user.password,
        },
        { withCredentials: true }
      )
      .then((res) => {
        console.log("res", res);
        localStorage.setItem("loginStatus", JSON.stringify(true));
        return res.data;
      });
  } catch (error) {
    return rejectWithValue(error.response.data.message);
  }
};

const logout = async () => {
  // await axios
  //   .post(api + "logout", {}, { withCredentials: true })
  //   .then((res) => {
  //     localStorage.setItem("loginStatus", JSON.stringify(true));
  //     return res.data;
  //   });
  await axios({
    method: "post",
    url: api + "logout",
    data: { name: "jay" },
    withCredentials: true,
  })
    .then((res) => {
      localStorage.removeItem("loginStatus");
      return res.data;
    })
    .catch((err) => console.log("err", err));
};

const signup = async (user, rejectWithValue) => {
  try {
    await axios
      .post(
        api + "signup",
        {
          email: user.email,
          password: user.password,
        },
        { withCredentials: true }
      )
      .then((res) => {
        localStorage.setItem("loginStatus", JSON.stringify(true));
        return res.data;
      });
  } catch (error) {
    return rejectWithValue(error.response.data.message);
  }

  // const res = await axios.post(api + "signup", {
  //   email: user.email,
  //   password: user.password,
  // });
  // console.log("res.data", res.data);
  // return res.data;
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
