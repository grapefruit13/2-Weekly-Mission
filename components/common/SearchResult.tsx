import { useContext } from 'react';
import FolderContext from '@/contexts/FolderContext';
import styles from '@/styles/search/searchResult.module.css';

export default function SearchResult() {
  const { keyword } = useContext(FolderContext);

  return (
    <span className={styles.resultMessage}>
      <span className={styles.keyword}>{keyword}</span>
      <span className={styles.sub}>으로 검색한 결과입니다.</span>
    </span>
  );
}
