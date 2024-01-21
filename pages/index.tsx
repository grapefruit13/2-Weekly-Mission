import { useContext, useEffect, useState } from 'react';
import Head from 'next/head';
import { filterByKeyword } from '@/utils/searchUtils';
import { getData } from '@/utils/api';
import FolderContext from '@/contexts/FolderContext';
import Header from '@/components/common/Header';
import MainHeader from '@/components/common/sharedPage/MainHeader';
import SearchBar from '@/components/common/SearchBar';
import CardWrapper from '@/components/common/CardWrapper';
import styles from '@/styles/card/cardWrapper.module.css';

export default function Home() {
  const { keyword, filteredLinks, setFilteredLinks } =
    useContext(FolderContext);
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
    owner: { id: 0, name: '', profileImageSource: '' },
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
      throw new Error(`getSampleUserData ${e} 오류`);
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
    getSampleUserData();
    getLinks();
  }, []);

  useEffect(() => {
    setFilteredLinks(filterByKeyword(folder.links, keyword));
  }, [keyword]);

  return (
    <>
      <Head>
        <title>Linkbrary</title>
        <meta name='og:url' content='https://www.linkbrary.com' />
        <meta name='og:title' content='Linkbrary' />
        <meta
          property='og:description'
          content='세상의 모든 정보를 쉽게 저장하고 관리해 보세요'
        />
        <meta
          property='og:image'
          content='https://i.namu.wiki/i/8JbLEOm1EezAZzdujEwIA8rvaHFgPyqA3lUfr0HQXQ3T9tVClLGppcw82RTpyguF18pYI4ysHX9C0yzkb6G_7A.webp'
        />
        <meta name='viewport' content='width=device-width, initial-scale=1' />
      </Head>
      <main>
        <Header profileData={profileData} />
        <MainHeader folderData={folder} />
        <div className={styles.mainWrapper}>
          <SearchBar />
          <CardWrapper
            links={keyword && filteredLinks ? filteredLinks : folder.links}
          />
        </div>
      </main>
    </>
  );
}
