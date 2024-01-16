import Link from 'next/link';
import styles from '@/styles/header/header.module.css';

export default function LoginButton() {
  return (
    <>
      <Link href="/signin">
        <button className={`${styles.loginBtn} ${styles.button}`}>
          로그인
        </button>
      </Link>
    </>
  );
}
