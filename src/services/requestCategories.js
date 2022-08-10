const requestCategoriesObj = {
  requestCategories: async () => {
    const url = 'https://opentdb.com/api_category.php';
    const response = await fetch(url);
    const data = await response.json();
    return data.trivia_categories;
  },
};

export default requestCategoriesObj;
