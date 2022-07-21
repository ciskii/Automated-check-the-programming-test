const axios = require("axios");
const api = "http://localhost:5000/api/question/";

const create = async (question, rejectWithValue) => {
  const { newQ, QuizId } = question;
  try {
    const res = await axios.post(
      api + "create/" + QuizId,
      {
        questionObj: newQ, // array of questions
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
    console.log("res.data.questions", res.data.questions);
    return res.data.questions;
  } catch (err) {
    return rejectWithValue(err.response.data.message);
  }
};
const questionService = {
  create,
  getAllQuestions,
};

export default questionService;
