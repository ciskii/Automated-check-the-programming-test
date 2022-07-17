const axios = require("axios");
const api = "http://localhost:5000/api/course/";

const create = async (user, rejectWithValue) => {
  try {
    await axios
      .post(
        api + "create",
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
};

const courseService = {
  create,
};

export default courseService;
