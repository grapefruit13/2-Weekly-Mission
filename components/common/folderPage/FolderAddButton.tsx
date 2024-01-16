import { useContext } from 'react';
import Image from 'next/image';
import FolderContext from '@/contexts/FolderContext';
import styles from '@/styles/card/cardWrapper.module.css';

export default function FolderAddButton() {
  const { setClickedOption } = useContext(FolderContext);
  return (
    <button className={styles.folderAddButton}>
      <Image
        src="/assets/icons/card/add.svg"
        width={16}
        height={16}
        alt="plus-button"
        onClick={() => {
          setClickedOption({ addNewFolder: true });
        }}
      />
    </button>
  );
}
