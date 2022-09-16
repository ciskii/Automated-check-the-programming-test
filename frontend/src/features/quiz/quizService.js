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

const deleteQuiz = async (quizId, rejectWithValue) => {
  try {
    const res = await axios.delete(api + "delete/" + quizId, {
      withCredentials: true,
    });
    return res.data;
  } catch (err) {
    return rejectWithValue(err.response.data.message);
  }
};

const toggleRelease = async (quiz, rejectWithValue) => {
  const { id, isRelease } = quiz;

  try {
    const res = await axios.put(
      api + "toggleRelease",
      {
        id: id,
        isRelease: !isRelease, // toggle isRelease
      },
      {
        withCredentials: true,
      }
    );
    return res.data;
  } catch (err) {
    return rejectWithValue(err.response.data.message);
  }
};

const isSentQuiz = async (sentQuizInfo, rejectWithValue) => {
  const { StudentId, quizzesId } = sentQuizInfo;

  console.log("StudentId", StudentId);
  console.log("quizzesId", quizzesId);
  try {
    const res = await axios.post(
      api + "isSentQuiz",
      { sentQuizInfo },
      {
        withCredentials: true,
      }
    );
    return res.data;
  } catch (err) {
    return rejectWithValue(err.response.data.message);
  }
};

const getAllQuizzes = async (CourseId, rejectWithValue) => {
  try {
    const res = await axios.get(api + "getAll/" + CourseId, {
      withCredentials: true,
    });
    return res.data.quizzes;
  } catch (err) {
    return rejectWithValue(err.response.data.message);
  }
};
const quizService = {
  create,
  deleteQuiz,
  toggleRelease,
  getAllQuizzes,
  isSentQuiz,
};

export default quizService;
