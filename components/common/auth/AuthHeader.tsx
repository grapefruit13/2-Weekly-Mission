import Image from 'next/image';
import Link from 'next/link';
import { useRouter } from 'next/router';
import styles from '@/styles/auth/auth.module.css';

export default function AuthHeader() {
  const router = useRouter();
  const pathname = router.pathname;
  return (
    <div className={styles.headerContainer}>
      <Link href="/">
        <Image
          src="/assets/icons/header/logo.svg"
          width={210}
          height={38}
          alt="logo"
        />
      </Link>
      <div className={styles.headerLinkWrapper}>
        <span className={styles.headerLinkMsg}>
          {pathname === '/signin' && '회원이 아니신가요?'}
          {pathname === '/signup' && '이미 회원이신가요?'}
        </span>
        <Link
          href={pathname === '/signin' ? '/signup' : '/signin'}
          className={styles.headerLinkTitle}
        >
          {pathname === '/signin' && '회원가입 하기'}
          {pathname === '/signup' && '로그인 하기'}
        </Link>
      </div>
    </div>
  );
}
