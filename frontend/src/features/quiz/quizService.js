const axios = require("axios");
const api = "http://localhost:5000/api/quiz/";

const create = async (quiz, rejectWithValue) => {
  try {
    const res = await axios.post(
      api + "create",
      {
        CourseId: quiz.CourseId,
        name: quiz.name,
      },
      { withCredentials: true }
    );
    return res.data;
  } catch (err) {
    return rejectWithValue(err.response.data.message);
  }
};

const getAllQuizzes = async (quiz, rejectWithValue) => {
  try {
    const res = await axios.get(
      api + "getAll",
      {
        CourseId: quiz.CourseId,
      },
      { withCredentials: true }
    );
    console.log("res.data", res.data.courses);
    return res.data.courses;
  } catch (err) {
    return rejectWithValue(err.response.data.message);
  }
};
const quizService = {
  create,
  getAllQuizzes,
};

export default quizService;
