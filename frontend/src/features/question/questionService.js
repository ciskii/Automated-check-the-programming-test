const axios = require("axios");
const api = "http://localhost:5000/api/question/";

const create = async (question, rejectWithValue) => {
  console.log("question", question);
  const { newQ, QuizId } = question;
  try {
    const res = await axios.post(
      api + "create/" + question.QuizId,
      {
        questionObj: newQ, // array of questions
      },
      { withCredentials: true }
    );
    console.log("res.data", res.data);
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
