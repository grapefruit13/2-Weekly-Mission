import Image from 'next/image';
import Link from 'next/link';
import logo from '/public/assets/icons/header/logo.png';
import styles from '@/styles/header/header.module.css';

export default function Logo() {
  return (
    <>
      <div className={styles.logo}>
        <Link href="/">
          <Image
            className={styles.logoImg}
            src={logo}
            width={133}
            height={24}
            alt="logo"
          />
        </Link>
      </div>
    </>
  );
}
