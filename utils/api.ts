import axios from 'axios';
import { getToken } from './auth';

const accessToken = getToken();

const instance = axios.create({
  baseURL: 'https://bootcamp-api.codeit.kr/api',
  timeout: 5000,
  headers: {
    'Content-Type': 'application/json',
    Authorization: `Bearer ${accessToken}`,
  },
});

export async function getFolders() {
  try {
    const res = await instance.get('/folders');
    return res;
  } catch (e) {
    throw new Error(`getFolders ${e}`);
  }
}

export async function getUsers() {
  try {
    const res = await instance.get('/users');
    return res.data.data[0];
  } catch (e) {
    throw new Error(`getUsers ${e}`);
  }
}

export async function getLinks(userId: number) {
  try {
    const res = await instance.get(`/users/${userId}/links`);
    return res.data.data;
  } catch (e) {
    throw new Error(`getLinks ${e}`);
  }
}

export async function getAllFolders(userId: number) {
  try {
    const res = await instance.get(`/users/${userId}/folders`);
    return res.data.data;
  } catch (e) {
    throw new Error(`getAllFolders ${e}`);
  }
}

export async function getLinksByFolder(userId: number, folderId: number) {
  try {
    const res = await instance.get(
      `/users/${userId}/links?folderId=${folderId}`,
    );
    return res.data.data;
  } catch (e) {
    throw new Error(`getLinksByFolder ${e}`);
  }
}

export async function getData(url: string) {
  try {
    const response = await instance.get(`${url}`);
    return response.data;
  } catch (e) {
    throw new Error(`getData에서 ${e} 발생`);
  }
}

export async function checkDuplicateEmail(email: string) {
  try {
    const res = await instance.post('/check-email', {
      email: email,
    });
    return res.data;
  } catch (e: any) {
    if (e.response) return e.response.data;
  }
}

export async function signup(data: { email: string; password: string }) {
  try {
    const res = await instance.post('/sign-up', data);
    return res.data.data;
  } catch (e: any) {
    if (!e.response) {
      alert('회원가입에 실패했습니다.');
    } else {
      return e.response.data;
    }
  }
}

export async function signin(data: { email: string; password: string }) {
  try {
    const res = await instance.post('/sign-in', data);
    return res.data.data;
  } catch (e: any) {
    if (!e.response) {
      alert('로그인에 실패했습니다.');
    } else {
      return e.response.data;
    }
  }
}
