import { FOLDERS_API } from '@/constants';
import instance from './axios';

export const Folder = {
  // 폴더 상세 조회
  get: async (folderId: number) => {
    try {
      const res = await instance.get(`${FOLDERS_API}/${folderId}`);
      return res.data;
    } catch (e) {
      throw new Error(`Folder.delete ${e}`);
    }
  },
  delete: async (folderId: number) => {
    try {
      const res = await instance.delete(`${FOLDERS_API}/${folderId}`);
    } catch (e) {
      throw new Error(`Folder.delete ${e}`);
    }
  },
  edit: async (folderId: number, name: string) => {
    try {
      const res = await instance.put(`${FOLDERS_API}/${folderId}`, { name });
    } catch (e) {
      throw new Error(`Folder.edit ${e}`);
    }
  },
  // 유저의 전체 폴더 조회
  getList: async () => {
    try {
      const res = await instance.get(FOLDERS_API);
      return res.data.data.folder;
    } catch (e) {
      throw new Error(`Folder.get ${e}`);
    }
  },
  // 유저의 폴더 생성
  create: async (name: string) => {
    try {
      const res = await instance.post(FOLDERS_API, { name });
      return res.data.data.folder;
    } catch (e) {
      throw new Error(`Folder.get ${e}`);
    }
  },
};
