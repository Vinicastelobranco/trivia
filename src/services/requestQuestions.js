const defaultValue = 5;

const requestQuestionsObj = {
  requestQuestions: async (token, { category = '', difficulty = '', type = '' }) => {
    const url = `https://opentdb.com/api.php?amount=${defaultValue}&category=${category}&difficulty=${difficulty}&type=${type}&token=${token}`;
    const response = await fetch(url);
    const data = await response.json();
    return data;
  },
};

export default requestQuestionsObj;
