import { FOLDERS_API, LINKS_API, USERS_API } from '@/constants';
import instance from './axios';

export const Shared = {
  // 유저가 가지고 있는 특정 폴더 읽기
  getFolder: async (userId: number, folderId: number) => {
    try {
      const res = await instance.get(
        `${USERS_API}/${userId}${FOLDERS_API}/${folderId}`,
      );
      return res.data.data;
    } catch (e) {
      throw new Error(`Shared.getFolder ${e}`);
    }
  },
  // 유저가 가지고 있는 모든 폴더 읽기
  getFolderList: async (userId: number) => {
    try {
      const res = await instance.get(`${USERS_API}/${userId}${FOLDERS_API}`);
      return res.data.data;
    } catch (e) {
      throw new Error(`Shared.getFolderList ${e}`);
    }
  },
  // 유저가 가지고 있는 링크 읽기
  getLinks: async (userId: number, folderId: number) => {
    try {
      let url = `${USERS_API}/${userId}${LINKS_API}`;
      if (folderId !== undefined) {
        url += `?folderId=${folderId}`;
      }
      const res = await instance.get(url);
    } catch (e) {
      throw new Error(`Shared.getLinks ${e}`);
    }
  },
};
