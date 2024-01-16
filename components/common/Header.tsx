import Image from 'next/image';
import LoginButton from '@/components/common/LoginButton';
import Logo from '@/components/common/Logo';
import styles from '@/styles/header/header.module.css';

interface Props {
  profileData: {
    id: number;
    created_at?: string;
    name: string;
    image_source: string;
    email: string;
    auth_id?: string;
  };
}

export default function Header({ profileData }: Props) {
  const {
    name = 'defaultName',
    image_source = 'https://images.unsplash.com/photo-1701600713610-0f724c65168d?q=80&w=1074&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
    email = 'default@email.com',
  } = profileData;

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
