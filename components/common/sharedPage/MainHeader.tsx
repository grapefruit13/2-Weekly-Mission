import styles from '@/styles/header/mainHeader.module.css';
import Image from 'next/image';

interface OwnerDataProps {
  id: string;
  name: string;
  profileImageSource: string;
}

interface FolderProps {
  id: string;
  name: string;
  owner: object;
  links?: {}[];
}

export default function MainHeader({
  ownerDatas,
  folderDatas,
}: {
  ownerDatas: OwnerDataProps;
  folderDatas: FolderProps;
}) {
  return (
    <>
      <div className={styles.container}>
        <div className={styles.profile}>
          <Image
            className={styles.profileImg}
            src={ownerDatas.profileImageSource}
            alt="profileImg"
            width={60}
            height={60}
          />
          <div className={styles.profileName}>@{ownerDatas.name}</div>
        </div>
        <span className={styles.folderName}>{folderDatas.name}</span>
      </div>
    </>
  );
}
