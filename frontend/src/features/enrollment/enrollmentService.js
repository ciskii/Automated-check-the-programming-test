const axios = require("axios");
const api = "http://localhost:5000/api/enrollment/";

const enrollCourse = async (course, rejectWithValue) => {
  try {
    const res = await axios.post(
      api + "enrollCourse",
      {
        courseId: course.courseId,
      },
      { withCredentials: true }
    );
    return res.data;
  } catch (err) {
    return rejectWithValue(err.response.data.message);
  }
};

const enrollService = {
  enrollCourse,
};

export default enrollService;
