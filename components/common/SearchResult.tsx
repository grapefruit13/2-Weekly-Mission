import styles from '@/styles/search/searchResult.module.css';
import { useRouter } from 'next/router';

export default function SearchResult() {
  const router = useRouter();
  const search = router.query.keyword;

  return (
    <>
      <span className={styles.resultMessage}>
        <span className={styles.keyword}>{search}</span>
        <span className={styles.sub}>으로 검색한 결과입니다.</span>
      </span>
    </>
  );
}
