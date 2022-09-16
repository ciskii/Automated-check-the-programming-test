const axios = require("axios");
const api = "http://localhost:5000/api/answer/";

const create = async (savedAnswers, rejectWithValue) => {
  try {
    const res = await axios.post(
      api + "create/",
      {
        StudentId: savedAnswers.id,
        savedAnswers: savedAnswers.savedAnswersObj, // array of saved answers
        QuizId: savedAnswers.QuizId,
      },
      { withCredentials: true }
    );
    console.log("res.data", res.data);
    return res.data;
  } catch (err) {
    console.log("err", err);
    return rejectWithValue(err.response.data.message);
  }
};

const getAllAnswers = async (ids, rejectWithValue) => {
  try {
    const res = await axios.post(
      api + `getAll/${ids.StudentId}`,
      {
        questionIds: ids.questionIds,
      },
      {
        withCredentials: true,
      }
    );
    // console.log("answers", res.data);
    return res.data;
  } catch (err) {
    return rejectWithValue(err.response.data.message);
  }
};

const provideScore = async (savedAnswers, rejectWithValue) => {
  // const { StudentId } = savedAnswers[0];
  try {
    const res = await axios.post(
      api + "score/provide",
      {
        // StudentId: StudentId,
        savedAnswers: savedAnswers,
      },
      { withCredentials: true }
    );

    console.log("res.data", res.data);

    return res.data;
  } catch (err) {
    return rejectWithValue(err.response.data.message);
  }
};

const getScores = async (QuizId, rejectWithValue) => {
  try {
    const res = await axios.get(api + `score/getAll/${QuizId}`, {
      withCredentials: true,
    });

    return res.data;
  } catch (err) {
    return rejectWithValue(err.response.data.message);
  }
};

const getQuizScores = async (ids, rejectWithValue) => {
  try {
    const res = await axios.get(
      api + `score/getQuizScores/${ids.QuizId}/${ids.StudentId}`,
      {
        withCredentials: true,
      }
    );
    // console.log("answers", res.data);
    return res.data;
  } catch (err) {
    return rejectWithValue(err.response.data.message);
  }
};

const answerService = {
  create,
  getAllAnswers,
  provideScore,
  getScores,
  getQuizScores,
};

export default answerService;
