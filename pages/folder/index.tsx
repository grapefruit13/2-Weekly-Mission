import { useContext, useEffect, useState } from 'react';
import { getData } from '@/utils/api';
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

export default function Folder() {
  const {
    addedLink,
    clickedOption,
    folderList,
    setFolderList,
    keyword,
    filteredLinks,
    setFilteredLinks,
  } = useContext(FolderContext);
  const [profileData, setProfileData] = useState({
    id: 0,
    created_at: '',
    name: '',
    image_source: '',
    email: '',
    auth_id: '',
  });
  const [links, setLinks] = useState([]);
  const [currentFolder, setCurrentFolder] = useState<{
    id: string;
    name?: string;
  }>({ id: '', name: '전체' });

  const getUserData = async () => {
    try {
      const result = await getData('users/1');
      const { id, created_at, name, image_source, email, auth_id } =
        result.data[0];
      setProfileData((prevProfileData) => ({
        ...prevProfileData,
        id,
        created_at,
        name,
        image_source,
        email,
        auth_id,
      }));
    } catch (e) {
      throw new Error(`Folderpage getUserData ${e}`);
    }
  };

  const getTotalLinksData = async () => {
    try {
      const result = await getData('users/1/links');
      const { data } = result;
      const links = data.map((link: any) => ({
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
      const result = await getData('users/1/folders');
      const { data } = result;
      data.unshift({ name: '전체' });
      setFolderList(data);
    } catch (e) {
      throw new Error(`Folderpage의 getFolderList에서 ${e} 발생`);
    }
  };

  const getFolder = async () => {
    try {
      const result = await getData(
        `users/1/links?folderId=${currentFolder?.id}`,
      );
      const { data } = result;
      const datas = data.map((link: any) => ({
        ...link,
        createdAt: link.created_at,
        imageSource: link.image_source,
      }));
      setLinks(datas);
    } catch (e) {
      throw new Error(
        `Folderpage의 handleFolderClick의 getFolder에서 ${e} 발생`,
      );
    }
  };

  const handleFolderClick = (
    e: React.MouseEvent<HTMLDivElement, MouseEvent>,
  ) => {
    const textContent = e.currentTarget.textContent;
    setCurrentFolder((prev) => ({ ...prev, name: textContent?.toString() }));
    if (textContent === '전체') {
      getTotalLinksData();
      return;
    }
    const clikedFolder: any = folderList.filter(
      (folder: any) => folder.name === textContent,
    );
    setCurrentFolder(clikedFolder[0]);
  };

  useEffect(() => {
    getUserData();
    getTotalLinksData();
    getFolderList();
  }, []);

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
          title="폴더에 추가"
          button={{ color: 'blue', text: '추가하기' }}
          subtitle={addedLink}
          folderList={folderList}
        />
      )}
      {clickedOption.shareFolder && (
        <Modal title="폴더 공유" subtitle={currentFolder?.name} share />
      )}
      {clickedOption.editFolderName && (
        <Modal
          title="폴더 이름 변경"
          folderName={currentFolder?.name}
          input
          button={{ color: 'blue', text: '변경하기' }}
        />
      )}
      {clickedOption.deleteFolder && (
        <Modal
          title="폴더 삭제"
          subtitle={currentFolder?.name}
          button={{ color: 'red', text: '삭제하기' }}
        />
      )}
      {clickedOption.addNewFolder && (
        <Modal
          title="폴더 추가"
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
                        onClick={(e) => handleFolderClick(e)}
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
                  <Nolinks msg="folderList가 없습니다." />
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
        {!folderList.length && <Nolinks msg="저장된 링크가 없습니다" />}
      </div>
    </>
  );
}
