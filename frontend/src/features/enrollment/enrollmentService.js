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

const getEnrolledStudents = async (CourseId, rejectWithValue) => {
  try {
    const res = await axios.post(
      api + "getStudents",
      {
        CourseId: CourseId,
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
  getEnrolledStudents,
};

export default enrollService;
