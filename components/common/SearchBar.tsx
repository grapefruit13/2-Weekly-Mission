import { useContext, useState } from 'react';
import FolderContext from '../../contexts/FolderContext';
import styles from '@/styles/search/searchbar.module.css';
import { useRouter } from 'next/router';

export default function SearchBar() {
  const { setKeyword } = useContext(FolderContext);
  const router = useRouter();
  const [isSearchActive, setIsSearchActive] = useState(false);

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (
      e.key === 'Enter' ||
      (e.key === 'Backspace' && router.query.keyword === '')
    ) {
      setKeyword(router.query);

      router.push({
        query: '',
      });
    }
  };

  const handleKeywordChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (!e.target.value) {
      setIsSearchActive(false);
      router.push({
        query: { keyword: '' },
      });
      return;
    }

    if (!isSearchActive) {
      setIsSearchActive(true);
    }

    router.push({
      pathname: `${router.pathname}`,
      query: { keyword: `${e.target.value}` },
    });
  };

  return (
    <>
      <input
        className={`${styles.searchbarInput} ${
          isSearchActive ? styles.active : styles.inactive
        }`}
        name="keyword"
        type="text"
        placeholder="링크를 검색해 보세요."
        onChange={(e) => handleKeywordChange(e)}
        onKeyDown={(e) => handleKeyDown(e)}
      />
    </>
  );
}
