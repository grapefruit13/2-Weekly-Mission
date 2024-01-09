import { useContext } from 'react';
import FolderContext from '../../contexts/FolderContext';
import styles from '@/styles/search/searchbar.module.css';

export default function SearchBar() {
  // const { handleSetSearchKeyword } = useContext(FolderContext);

  const handleKeyDown = (e: any) => {
    if (e.key === 'Enter') {
      console.log('pressed enter');
    }
  };

  return (
    <>
      <input
        className={styles.searchbarInput}
        type="text"
        placeholder="링크를 검색해 보세요."
      />
    </>
  );
}
