import {
  CHECK_EMAIL_API,
  REFRESH_TOKEN_API,
  SIGN_IN_API,
  SIGN_UP_API,
} from '@/constants';
import instance from './axios';

const Auth = {
  signup: async (data: { email: string; password: string }) => {
    try {
      const res = await instance.post(SIGN_UP_API, data);
      return res.data.data;
    } catch (e: any) {
      if (!e.response) {
        alert('회원가입에 실패했습니다.');
      } else {
        return e.response.data;
      }
    }
  },
  signin: async (data: { email: string; password: string }) => {
    try {
      const res = await instance.post(SIGN_IN_API, data);
      return res.data.data;
    } catch (e: any) {
      if (!e.response) {
        alert('로그인에 실패했습니다.');
      } else {
        return e.response.data;
      }
    }
  },
  refresh: async (refreshToken: string) => {
    try {
      const res = await instance.post(REFRESH_TOKEN_API, {
        refresh_token: refreshToken,
      });
      return res.data.data;
    } catch (e: any) {
      if (!e.response) {
        alert('토큰 갱신에 실패했습니다.');
      } else {
        return e.response.data;
      }
    }
  },
  checkEmail: async (email: string) => {
    try {
      const res = await instance.post(CHECK_EMAIL_API, {
        email,
      });
      return res.data;
    } catch (e: any) {
      if (e.response) return e.response.data;
    }
  },
};
