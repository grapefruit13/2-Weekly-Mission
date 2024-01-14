import styles from '@/styles/search/searchResult.module.css';

export default function SearchResult() {
  return (
    <div className={styles.searchResultContainer}>
      <span className={styles.resultMessage}>
        <span className={styles.keyword}>코드잇</span>
        <span className={styles.sub}>으로 검색한 결과입니다.</span>
      </span>
    </div>
  );
}
