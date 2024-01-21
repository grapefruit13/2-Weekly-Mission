export const getToken = () => {
  const accessToken =
    typeof localStorage !== 'undefined'
      ? localStorage.getItem('accessToken')
      : null;
  return accessToken;
};

export const setToken = (token: string) => {
  return localStorage.setItem('accessToken', token);
};
