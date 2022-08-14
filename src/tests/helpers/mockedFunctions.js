import requestTokenObj from '../../services/requestToken';
import requestQuestionsObj from '../../services/requestQuestions';
import { mockedToken, mockedQuestions } from './mockedData';
import requestCategoriesObj from '../../services/requestCategories';

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

export const mockedReqCategories = jest.spyOn(requestCategoriesObj, 'requestCategories').mockImplementation(async () => {
  const categories = await Promise.resolve({
    trivia_categories: [ 
      {id: 9, name: 'General Knowledge'},
      {id: 10, name: 'Entertainment: Books'},
      {id: 11, name: 'Entertainment: Film'},
      {id: 12, name: 'Entertainment: Music'},
    ]
  });
  return categories.trivia_categories;
});
