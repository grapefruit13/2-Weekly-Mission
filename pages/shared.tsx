import { useContext, useEffect, useState } from 'react';
import FolderContext from '@/contexts/FolderContext';
import Header from '@/components/common/Header';
import MainHeader from '@/components/common/sharedPage/MainHeader';
import SearchBar from '@/components/common/SearchBar';
import CardWrapper from '@/components/common/CardWrapper';
import { getData } from '@/utils/api';
import { filterByKeyword } from '@/utils/searchUtils';
import styles from '@/styles/header/mainHeader.module.css';

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

export default function Shared() {
  const { keyword, filteredLinks, setFilteredLinks } =
    useContext(FolderContext);
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
      throw Error(`getSampleUserData에서 ${e}`);
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
    } catch (e) {
      throw Error(`getLinks에서 ${e} 오류`);
    }
  };

  useEffect(() => {
    getSampleUserData();
    getLinks();
  }, []);

  useEffect(() => {
    setFilteredLinks(filterByKeyword(links, keyword));
  }, [keyword]);

  return (
    <>
      <Header profileDatas={profileDatas} />
      <MainHeader ownerDatas={ownerDatas} folderDatas={folderDatas} />
      <div className={styles.mainWrapper}>
        <SearchBar />
        <CardWrapper links={keyword && filteredLinks ? filteredLinks : links} />
      </div>
    </>
  );
}
