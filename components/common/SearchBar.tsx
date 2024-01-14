import { useContext, useRef, useState } from 'react';
import { useRouter } from 'next/router';
import Image from 'next/image';
import FolderContext from '@/contexts/FolderContext';
import SearchResult from '@/components/common/SearchResult';
import styles from '@/styles/search/searchbar.module.css';

export default function SearchBar() {
  const router = useRouter();
  const { setKeyword, isSearchResultShowed, setIsSearchResultShowed } =
    useContext(FolderContext);
  const [isSearchActive, setIsSearchActive] = useState(false);
  const inputRef = useRef<HTMLInputElement | null>(null);

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Backspace' && router.query.keyword === '') {
      setKeyword(router.query);
    }
    if (e.key === 'Enter') {
      setKeyword(router.query);
      if (!router.query.keyword) return;
      setIsSearchResultShowed(true);
    }
  };

  const handleKeywordChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (!e.target.value) {
      setIsSearchActive(false);
      setIsSearchResultShowed(false);
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

  const handleButtonClick = () => {
    if (inputRef.current) {
      inputRef.current.value = '';
    }
    setKeyword('');
    router.push({
      query: '',
    });
  };

  return (
    <>
      <div className={styles.searchBarContainer}>
        <input
          ref={inputRef}
          className={`${styles.searchbarInput} ${
            isSearchActive ? styles.active : styles.inactive
          }`}
          name="keyword"
          type="text"
          placeholder="링크를 검색해 보세요."
          onChange={(e) => handleKeywordChange(e)}
          onKeyDown={(e) => handleKeyDown(e)}
        />
        <button onClick={handleButtonClick}>
          <Image
            className={styles.closeButton}
            src="/assets/icons/search/close.svg"
            width={24}
            height={24}
            alt="reset-addLink"
          />
        </button>
      </div>
      {isSearchResultShowed && <SearchResult />}
    </>
  );
}
