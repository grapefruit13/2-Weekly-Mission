import { useContext } from 'react';
import Image from 'next/image';
import FolderContext from '@/contexts/FolderContext';
import styles from '@/styles/card/cardWrapper.module.css';

interface Props {
  id: number;
  name: string;
  img: any;
}

export default function Option({ optionData }: { optionData: Props }) {
  const { name, img } = optionData;
  const { setClickedOption } = useContext(FolderContext);

  const handleButtonClick = () => {
    if (name === '공유') setClickedOption({ shareFolder: true });
    if (name === '이름 변경') setClickedOption({ editFolderName: true });
    if (name === '삭제') setClickedOption({ deleteFolder: true });
  };

  return (
    <button className={styles.optionWrapper} onClick={handleButtonClick}>
      <Image
        className={styles.optionImg}
        src={img}
        width={18}
        height={18}
        alt="option-img"
      />
      <div className={styles.optionName}>{name}</div>
    </button>
  );
}
