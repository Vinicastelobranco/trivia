export const mockedToken = {
  response_code: 0,
  response_message: 'Token Generated Successfully!',
  token: 'f00cb469ce38726ee00a7c6836761b0a4fb808181a125dcde6d50a9f3c9127b6',
};

export const mockedQuestions = {
    response_code: 0,
    results: [
      {
          category: 'Entertainment: Television',
          type: 'multiple',
          difficulty: 'medium',
          question: 'In the episode of SpongeBob SquarePants, &quot;Survival of the Idiots&quot;, Spongebob called Patrick which nickname?',
          correct_answer: 'Pinhead',
          incorrect_answers: [
              'Starfish',
              'Larry',
              'Dirty Dan'
          ]
      },
      {
          category: 'History',
          type: 'multiple',
          difficulty: 'medium',
          question: 'What year is considered to be the year that the British Empire ended?',
          correct_answer: '1997',
          incorrect_answers: [
              '1986',
              '1981',
              '1971'
          ]
      },
      {
          category: 'History',
          type: 'multiple',
          difficulty: 'medium',
          question: 'When did Norway get its constitution?',
          correct_answer: '1814',
          incorrect_answers: [
              '1932',
              '1905',
              '1854'
          ]
      },
      {
          category: 'Geography',
          type: 'boolean',
          difficulty: 'easy',
          question: 'Nova Scotia is on the east coast of Canada.',
          correct_answer: 'True',
          incorrect_answers: [
              'False'
          ]
      },
      {
          category: 'Entertainment: Comics',
          type: 'multiple',
          difficulty: 'medium',
          question: 'What is Homestuck character Gamzee&#039;s last name?',
          correct_answer: 'Makara',
          incorrect_answers: [
              'Makera',
              'Makare',
              'Makrea'
          ]
      },
  ],
}