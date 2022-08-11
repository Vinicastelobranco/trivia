import requestTokenObj from '../../services/requestToken';
import requestQuestionsObj from '../../services/requestQuestions';
import { mockedToken, mockedQuestions } from './mockedData';

export const mockedReqToken = jest.spyOn(requestTokenObj, 'requestToken').mockImplementation(async () => {
  const data = await Promise.resolve({
    ...mockedToken,
  });
  localStorage.setItem('token', data.token);
});

export const mockedReqQuestions = jest.spyOn(requestQuestionsObj, 'requestQuestions').mockImplementation(async (token, response = 0) => {
  const url = `https://opentdb.com/api.php?amount=5&token=${token}`
  const falseFetch = async (url) => {
   return await Promise.resolve({
    ...mockedQuestions,
   });
  };
  const data = falseFetch(url);
  return data;
});
