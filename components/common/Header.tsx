import Image from 'next/image';
import LoginButton from '@/components/common/LoginButton';
import Logo from '@/components/common/Logo';
import styles from '@/styles/header/header.module.css';

interface HeaderProps {
  id: number;
  created_at?: string;
  name: string;
  image_source: string;
  email: string;
  auth_id?: string;
}

export default function Header({ profileData }: { profileData: HeaderProps }) {
  const { id, created_at, name, image_source, email, auth_id } = profileData;

  return (
    <div className={styles.header}>
      <div className={styles.nav}>
        <Logo />
        {name ? (
          <div className={styles.profile}>
            <Image
              className={styles.profileImg}
              src={image_source}
              width={28}
              height={28}
              alt={name}
            />
            <p className={styles.profileName}>{email}</p>
          </div>
        ) : (
          <LoginButton />
        )}
      </div>
    </div>
  );
}
