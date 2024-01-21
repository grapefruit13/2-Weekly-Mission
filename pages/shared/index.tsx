import { useContext, useEffect, useState } from 'react';
import { getData } from '@/utils/api';
import { filterByKeyword } from '@/utils/searchUtils';
import FolderContext from '@/contexts/FolderContext';
import Header from '@/components/common/Header';
import MainHeader from '@/components/common/sharedPage/MainHeader';
import SearchBar from '@/components/common/SearchBar';
import CardWrapper from '@/components/common/CardWrapper';
import styles from '@/styles/header/mainHeader.module.css';

export default function Shared() {
  const folderContext = useContext(FolderContext);
  if (!folderContext) {
    return null;
  }
  const { keyword, filteredLinks, setFilteredLinks } = folderContext;
  const [profileData, setProfileData] = useState({
    id: 0,
    name: '',
    email: '',
    image_source: '',
  });
  const [folder, setFolder] = useState<{
    id: string;
    name: string;
    owner: {
      id: number;
      name: string;
      profileImageSource: string;
    };
    links?: {
      id: number;
      createdAt: string;
      url: string;
      title: string;
      description: string;
    }[];
  }>({
    id: '',
    name: '',
    owner: {
      id: 0,
      name: '',
      profileImageSource: '',
    },
    links: [],
  });

  const getSampleUserData = async () => {
    try {
      const response = await getData('sample/user');
      const { id, name, email, profileImageSource } = response;
      setProfileData((prevProfileData) => ({
        ...prevProfileData,
        id: id,
        name: name,
        email: email,
        image_source: profileImageSource,
      }));
    } catch (e) {
      throw new Error(`getSampleUserData에서 ${e}`);
    }
  };

  const getLinks = async () => {
    try {
      const result = await getData('sample/folder');
      const foldersData = result.folder;
      setFolder(foldersData);
    } catch (e) {
      throw new Error(`getLinks에서 ${e} 오류`);
    }
  };

  useEffect(() => {
    setFilteredLinks(filterByKeyword(folder?.links, keyword));
  }, [keyword]);

  useEffect(() => {
    getSampleUserData();
    getLinks();
  }, []);

  return (
    <>
      <Header profileData={profileData} />
      <MainHeader folderData={folder} />
      <div className={styles.mainWrapper}>
        <SearchBar />
        <CardWrapper
          links={keyword && filteredLinks ? filteredLinks : folder?.links}
        />
      </div>
    </>
  );
}