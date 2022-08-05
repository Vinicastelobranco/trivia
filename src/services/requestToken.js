const requestToken = async () => {
  const url = 'https://opentdb.com/api_token.php?command=request';
  const response = await fetch(url);
  const data = await response.json();
  localStorage.setItem('token', data.token);
};

export default requestToken;
