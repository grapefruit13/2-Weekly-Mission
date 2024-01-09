import { useContext } from 'react';
import Modal from './modal/Modal';
import KebabContext from '@/contexts/KebabContext';
import CardContext from '@/contexts/CardContext';
import FolderContext from '@/contexts/FolderContext';
import styles from '@/styles/card/dropdown.module.css';

export default function Dropdown() {
  const { clickedKebabOption, setClickedKebabOption, closeKebab } =
    useContext(KebabContext);
  const { folderLists } = useContext(FolderContext);
  const { linkInfo } = useContext(CardContext);

  return (
    <>
      <div className={styles.container}>
        {clickedKebabOption.delete && (
          <Modal
            title="링크 삭제"
            subtitle={linkInfo.url}
            button={{ color: 'red', text: '삭제하기' }}
            closeKebab={closeKebab}
          />
        )}
        {clickedKebabOption.addToFolder && (
          <Modal
            title="폴더에 추가"
            button={{ color: 'blue', text: '추가하기' }}
            subtitle={linkInfo.url}
            closeKebab={closeKebab}
            folderLists={folderLists}
          />
        )}
        <div
          className={styles.item}
          onClick={() => {
            setClickedKebabOption({ delete: true });
          }}
        >
          삭제하기
        </div>
        <div
          className={styles.item}
          onClick={() => {
            setClickedKebabOption({ addToFolder: true });
          }}
        >
          폴더에 추가
        </div>
      </div>
    </>
  );
}
