import { LINKS_API, USERS_API } from '@/constants';
import instance from './axios';

export const Link = {
  // 유저의 전체 링크 조회
  get: async (folderId?: number) => {
    try {
      let url = LINKS_API;
      if (folderId !== undefined) {
        url += `?folderId=${folderId}`;
      }
      const res = await instance.get(url);
      return res.data.data.folder;
    } catch (e) {
      throw new Error(`Link.get ${e}`);
    }
  },
  create: async (url: string, folderId: number) => {
    try {
      const res = await instance.post(LINKS_API, { url, folderId });
      return res.data.data;
    } catch (e) {
      throw new Error(`Link.get ${e}`);
    }
  },
  delete: async (linkId: number) => {
    try {
      const res = await instance.delete(`${LINKS_API}/${linkId}`);
      return res.data.data;
    } catch (e) {
      throw new Error(`Link.get ${e}`);
    }
  },
};
