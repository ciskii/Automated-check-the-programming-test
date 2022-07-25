const axios = require("axios");
const api = "http://localhost:5000/api/answer/";

const create = async (savedAnswers, rejectWithValue) => {
  try {
    const res = await axios.post(
      api + "create",
      {
        id: savedAnswers.id,
        savedAnswers: savedAnswers.savedAnswersObj, // array of saved answers
      },
      { withCredentials: true }
    );

    console.log("res.data", res.data);

    return res.data;
  } catch (err) {
    return rejectWithValue(err.response.data.message);
  }
};

const getAllAnswers = async (ids, rejectWithValue) => {
  console.log("ids", ids);
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
    return res.data;
  } catch (err) {
    return rejectWithValue(err.response.data.message);
  }
};
const answerService = {
  create,
  getAllAnswers,
};

export default answerService;
