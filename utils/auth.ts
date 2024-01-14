export const getToken = () => {
  return localStorage.getItem('accessToken');
};

export const setToken = (token: string) => {
  return localStorage.setItem('accessToken', token);
};
