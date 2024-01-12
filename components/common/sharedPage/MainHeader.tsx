import Image from 'next/image';
import styles from '@/styles/header/mainHeader.module.css';
interface Folder {
  folderData: {
    id: string;
    name: string;
    owner: {
      id: number;
      name: string;
      profileImageSource: string;
    };
    links?: {
      id: number;
      createdAt: string;
      url: string;
      title: string;
      description: string;
    }[];
  };
}

export default function MainHeader({ folderData }: Folder) {
  return (
    <>
      <div className={styles.container}>
        <div className={styles.profile}>
          <Image
            className={styles.profileImg}
            src={folderData.owner.profileImageSource}
            width={60}
            height={60}
            alt="profileImg"
          />
          <div className={styles.profileName}>@{folderData.owner.name}</div>
        </div>
        <span className={styles.folderName}>{folderData.name}</span>
      </div>
    </>
  );
}
