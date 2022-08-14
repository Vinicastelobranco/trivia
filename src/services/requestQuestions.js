const defaultValue = 5;

const requestQuestionsObj = {
  requestQuestions: async (token, { category, difficulty, type }) => {
    let url = '';
    if (category === '' && difficulty === '' && type === '') {
      url = `https://opentdb.com/api.php?amount=${defaultValue}&token=${token}`;
    } else {
      url = `https://opentdb.com/api.php?amount=${defaultValue}&category=${category}&difficulty=${difficulty}&type=${type}&token=${token}`;
    }
    const response = await fetch(url);
    const data = await response.json();
    return data;
  },
};

export default requestQuestionsObj;
