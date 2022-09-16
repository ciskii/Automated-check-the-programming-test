const axios = require("axios");
const api = "http://localhost:5000/api/question/";

const create = async (question, rejectWithValue) => {
  const { newQuestion, QuizId } = question;
  try {
    const res = await axios.post(
      api + "create/" + QuizId,
      {
        questions: newQuestion, // array of questions
      },
      { withCredentials: true }
    );
    console.log("res.data", res.data);

    return res.data;
  } catch (err) {
    return rejectWithValue(err.response.data.message);
  }
};

const createOne = async (QuizId, rejectWithValue) => {
  try {
    console.log("QuizId", QuizId);
    const res = await axios.post(
      api + "createOne/" + QuizId,
      {
        questions: "newQ", // array of questions
      },
      { withCredentials: true }
    );
    return res.data;
  } catch (err) {
    return rejectWithValue(err.response.data.message);
  }
};

const getAllQuestions = async (QuizId, rejectWithValue) => {
  try {
    const res = await axios.get(api + "getAll/" + QuizId, {
      withCredentials: true,
    });
    return res.data;
  } catch (err) {
    return rejectWithValue(err.response.data.message);
  }
};

const deleteQuestion = async (questionId, rejectWithValue) => {
  console.log("questionId", questionId);
  try {
    const res = await axios.delete(api + "delete/" + questionId, {
      withCredentials: true,
    });

    return res.data;
  } catch (err) {
    return rejectWithValue(err.response.data.message);
  }
};
const questionService = {
  create,
  createOne,
  getAllQuestions,
  deleteQuestion,
};

export default questionService;
