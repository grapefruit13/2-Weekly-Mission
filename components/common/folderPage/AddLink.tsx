import { useContext, useState } from 'react';
import FolderContext from '@/contexts/FolderContext';
import styles from '@/styles/folderPage/addLink.module.css';

export default function AddLink() {
  const { setClickedOption, setAddedLink } = useContext(FolderContext);
  const [linkValue, setLinkValue] = useState('');

  const handleBtnClick = (
    e: React.MouseEvent<HTMLButtonElement, MouseEvent>,
  ) => {
    setClickedOption({ addFolderLink: true });
    setAddedLink(linkValue);
  };

  return (
    <div className={styles.container}>
      <form className={styles.wrapper}>
        <input
          className={styles.addLink}
          type="text"
          name="addLink"
          placeholder="링크를 추가해보세요"
          value={linkValue}
          onChange={(e) => setLinkValue(e.target.value)}
        />
        <button
          type="button"
          className={styles.addBtn}
          onClick={(e) => handleBtnClick(e)}
        >
          추가하기
        </button>
      </form>
    </div>
  );
}
