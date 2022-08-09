const defaultValue = 5;

const requestQuestionsObj = {
  requestQuestions: async (token, numberOfQuestions = defaultValue) => {
    const url = `https://opentdb.com/api.php?amount=${numberOfQuestions}&token=${token}`;
    const response = await fetch(url);
    const data = await response.json();
    return data;
  },
};

export default requestQuestionsObj;
