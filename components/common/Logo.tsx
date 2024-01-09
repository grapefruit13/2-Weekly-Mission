import Image from 'next/image';
import logo from '/public/assets/icons/header/logo.png';
import styles from '@/styles/header/header.module.css';
import Link from 'next/link';

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
