const axios = require("axios");
const api = "http://localhost:5000/api/course/";

const create = async (quiz, rejectWithValue) => {
  try {
    const res = await axios.post(
      api + "create",
      {
        name: quiz.name,
      },
      { withCredentials: true }
    );
    return res.data;
  } catch (err) {
    return rejectWithValue(err.response.data.message);
  }
};

const getAllCourses = async (course, rejectWithValue) => {
  try {
    const res = await axios.get(api + "getAll", { withCredentials: true });
    console.log("res.data", res.data.courses);
    return res.data.courses;
  } catch (err) {
    return rejectWithValue(err.response.data.message);
  }
};
const courseService = {
  create,
  getAllCourses,
};

export default courseService;
