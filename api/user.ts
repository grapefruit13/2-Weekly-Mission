import { USERS_API } from '@/constants';
import instance from './axios';

export const User = {
  // 현재 유저 조회
  get: async () => {
    try {
      const res = await instance.get(USERS_API);
      return res.data.data[0];
    } catch (e) {
      throw new Error(`User.get ${e}`);
    }
  },
  // 유저의 정보 읽기
  getInfo: async (userId: number) => {
    try {
      const res = await instance.get(`${USERS_API}/${userId}`);
      return res.data.data;
    } catch (e) {
      throw new Error(`User.getInfo ${e}`);
    }
  },
};

export default User;
