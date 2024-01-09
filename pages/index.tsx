import Header from '@/components/common/Header';
import Head from 'next/head';
import { useEffect, useState } from 'react';
import { getData } from '../utils/api';
import MainHeader from '@/components/common/sharedPage/MainHeader';
import SearchBar from '@/components/common/SearchBar';
import CardWrapper from '@/components/common/CardWrapper';
import styles from '@/styles/card/cardWrapper.module.css';

export default function Home() {
  interface OwnerDataProps {
    id: string;
    name: string;
    profileImageSource: string;
  }

  interface FolderProps {
    id: string;
    name: string;
    owner: object;
    links?: {}[];
  }

  const [profileDatas, setProfileDatas] = useState({
    id: 0,
    name: '',
    email: '',
    image_source: '',
  });
  const [folderDatas, setFolderDatas] = useState<FolderProps>({
    id: '',
    name: '',
    owner: { default: 'default' },
  });

  const [ownerDatas, setOwnerDatas] = useState<OwnerDataProps>({
    id: '',
    name: '',
    profileImageSource: '',
  });
  const [links, setLinks] = useState([]);

  const getSampleUserData = async () => {
    try {
      const response = await getData('sample/user');
      const { id, name, email, profileImageSource } = response;
      setProfileDatas((prevProfileDatas) => ({
        ...prevProfileDatas,
        id: id,
        name: name,
        email: email,
        image_source: profileImageSource,
      }));
    } catch (e) {
      console.log(e);
    }
  };

  const getLinks = async () => {
    try {
      const result = await getData('sample/folder');
      const linksData = result.folder.links;
      const foldersData = result.folder;
      const ownerData = result.folder.owner;

      setFolderDatas(foldersData);
      setLinks(linksData);
      setOwnerDatas(ownerData);
      console.log('ownerData: ', ownerData);
      console.log('foldersData: ', foldersData);
    } catch (e) {
      console.log(`getLinks에서 ${e} 오류`);
    }
  };

  useEffect(() => {
    getSampleUserData();
    getLinks();
  }, []);

  return (
    <>
      <Head>
        <title>Linkbrary</title>
        <meta name="og:url" content="https://www.linkbrary.com" />
        <meta name="og:title" content="Linkbrary" />
        <meta
          property="og:description"
          content="세상의 모든 정보를 쉽게 저장하고 관리해 보세요"
        />
        <meta
          property="og:image"
          content="https://i.namu.wiki/i/8JbLEOm1EezAZzdujEwIA8rvaHFgPyqA3lUfr0HQXQ3T9tVClLGppcw82RTpyguF18pYI4ysHX9C0yzkb6G_7A.webp"
        />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link
          rel="stylesheet"
          type="text/css"
          href="https://cdn.jsdelivr.net/gh/orioncactus/pretendard/dist/web/static/pretendard.css"
        />
      </Head>
      <main>
        <Header profileDatas={profileDatas} />
        <MainHeader ownerDatas={ownerDatas} folderDatas={folderDatas} />
        <div className={styles.mainWrapper}>
          <SearchBar />
          <CardWrapper links={links} />
        </div>
      </main>
    </>
  );
}
