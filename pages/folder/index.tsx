import { useContext, useEffect, useState } from 'react';
import {
  getAllFolders,
  getFolders,
  getLinks,
  getLinksByFolder,
  getUsers,
} from '@/utils/api';
import { filterByKeyword } from '@/utils/searchUtils';
import FolderContext from '@/contexts/FolderContext';
import Modal from '@/components/common/folderPage/modal/Modal';
import Header from '@/components/common/Header';
import AddLink from '@/components/common/folderPage/AddLink';
import SearchBar from '@/components/common/SearchBar';
import Folders from '@/components/common/folderPage/Folders';
import FolderOptions from '@/components/common/folderPage/FolderOptions';
import Nolinks from '@/components/common/folderPage/NoLinks';
import CardWrapper from '@/components/common/CardWrapper';
import FolderAddButton from '@/components/common/folderPage/FolderAddButton';
import styles from '@/styles/card/cardWrapper.module.css';
import { getToken, setToken } from '@/utils/auth';
import { useRouter } from 'next/router';

export default function Folder() {
  const router = useRouter();
  const [profileData, setProfileData] = useState({
    id: 0,
    created_at: '',
    name: '',
    image_source: '',
    email: '',
    auth_id: '',
  });
  const {
    addedLink,
    clickedOption,
    folderList,
    setFolderList,
    keyword,
    filteredLinks,
    setFilteredLinks,
  } = useContext(FolderContext);
  const [links, setLinks] = useState([]);
  const [currentFolder, setCurrentFolder] = useState<{
    id: number;
    name?: string;
  }>({ id: 0, name: '전체' });

  const getUserData = async () => {
    try {
      const result = await getUsers();
      const { id, created_at, name, image_source, email, auth_id } = result;
      setProfileData({
        id,
        created_at,
        name,
        image_source,
        email,
        auth_id,
      });
    } catch (e) {
      throw new Error(`Folderpage getUserData ${e}`);
    }
  };

  const getTotalLinksData = async () => {
    try {
      const result = await getLinks(profileData.id);
      console.log(result, 'dd');
      const links = result.map((link: any) => ({
        ...link,
        createdAt: link.created_at,
        imageSource: link.image_source,
      }));
      setLinks(links);
    } catch (e) {
      throw new Error(`Folderpage의 getLinksData에서 ${e} 발생`);
    }
  };

  const getFolderList = async () => {
    try {
      const res = await getAllFolders(profileData.id);
      res.unshift({ name: '전체' });
      setFolderList(res);
    } catch (e) {
      throw new Error(`Folderpage의 getFolderList에서 ${e} 발생`);
    }
  };

  const getFolder = async () => {
    try {
      const res = await getLinksByFolder(profileData.id, currentFolder.id);
      const data = res.map((link: any) => ({
        ...link,
        createdAt: link.created_at,
        imageSource: link.image_source,
      }));
      setLinks(data);
    } catch (e) {
      throw new Error(
        `Folderpage의 handleFolderClick의 getFolder에서 ${e} 발생`,
      );
    }
  };

  const handleFolderClick = (folderId: number) => {
    if (!folderId) {
      setCurrentFolder((prev) => ({ ...prev, name: '전체' }));
      getTotalLinksData();
      return;
    }
    const clikedFolder: any = folderList.filter(
      (folder: any) => folder.id === folderId,
    );
    setCurrentFolder(clikedFolder[0]);
    if (folderId) {
      router.push(`/folder/${folderId}`);
    }
  };

  useEffect(() => {
    if (!getToken()) {
      router.replace('/signin');
    }
    getUserData();
  }, []);

  useEffect(() => {
    getTotalLinksData();
    getFolderList();
  }, [profileData.id]);

  useEffect(() => {
    getFolder();
  }, [currentFolder]);

  useEffect(() => {
    setFilteredLinks(filterByKeyword(links, keyword));
  }, [keyword]);

  return (
    <>
      {clickedOption.addFolderLink && addedLink && (
        <Modal
          title='폴더에 추가'
          button={{ color: 'blue', text: '추가하기' }}
          subtitle={addedLink}
          folderList={folderList}
        />
      )}
      {clickedOption.shareFolder && (
        <Modal title='폴더 공유' subtitle={currentFolder?.name} share />
      )}
      {clickedOption.editFolderName && (
        <Modal
          title='폴더 이름 변경'
          folderName={currentFolder?.name}
          input
          button={{ color: 'blue', text: '변경하기' }}
        />
      )}
      {clickedOption.deleteFolder && (
        <Modal
          title='폴더 삭제'
          subtitle={currentFolder?.name}
          button={{ color: 'red', text: '삭제하기' }}
        />
      )}
      {clickedOption.addNewFolder && (
        <Modal
          title='폴더 추가'
          input
          button={{ color: 'blue', text: '추가하기' }}
        />
      )}

      <Header profileData={profileData} />
      <AddLink />
      <div className={styles.mainWrapper}>
        <SearchBar />
        {folderList.length && (
          <div className={styles.folderCardContainer}>
            <div className={styles.folderAddContainer}>
              <div className={styles.folderWrapper}>
                {folderList ? (
                  folderList.map((folder: any) => {
                    return (
                      <div
                        key={`folder-${folder.id}`}
                        onClick={() => handleFolderClick(folder.id)}
                      >
                        <Folders
                          className={`${styles.listedFolderName} ${
                            currentFolder?.name === folder.name
                              ? styles.clickedFolder
                              : ''
                          }`}
                          folder={folder}
                        />
                      </div>
                    );
                  })
                ) : (
                  <Nolinks msg='folderList가 없습니다.' />
                )}
              </div>
              <FolderAddButton />
            </div>
            <div className={styles.folderOptionWrapper}>
              <div className={styles.currentFolderName}>
                {currentFolder?.name}
              </div>
              {currentFolder?.name === '전체' ? '' : <FolderOptions />}
            </div>
            {!links.length ? (
              <Nolinks msg={'이 폴더에 아직 저장된 링크가 없습니다'} />
            ) : (
              <CardWrapper
                links={keyword && filteredLinks ? filteredLinks : links}
              />
            )}
          </div>
        )}
        {!folderList.length && <Nolinks msg='저장된 링크가 없습니다' />}
      </div>
    </>
  );
}
