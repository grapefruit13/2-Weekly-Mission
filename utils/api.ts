import axios from 'axios';

axios.defaults.baseURL = 'https://bootcamp-api.codeit.kr/api';

export async function getData(url: string) {
  try {
    const response = await axios.get(`${url}`);
    return response.data;
  } catch (e) {
    throw new Error(`getData에서 ${e} 발생`);
  }
}

export async function checkDuplicateEmail(email: string) {
  try {
    const res = await axios.post('/check-email', {
      email: email,
    });
    return res.data;
  } catch (e: any) {
    if (e.response) return e.response.data;
  }
}

export async function postSignup(data: { email: string; password: string }) {
  try {
    const res = await axios.post('/sign-up', data);
    return res.data.data;
  } catch (e: any) {
    if (e.response) return e.response.data;
  }
}

export async function postSignin(data: { email: string; password: string }) {
  try {
    const res = await axios.post('/sign-in', data);
    return res.data.data;
  } catch (e: any) {
    if (e.response) return e.response.data;
  }
}
