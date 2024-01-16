import Option from '@/components/common/folderPage/Option';
import share from '/public/assets/icons/option/share.svg';
import pen from '/public/assets/icons/option/pen.svg';
import trashCan from '/public/assets/icons/option/trash-can.svg';
import styles from '@/styles/card/cardWrapper.module.css';

export default function FolderOptions() {
  const optionDatas = [
    { id: 1, name: '공유', img: share },
    { id: 2, name: '이름 변경', img: pen },
    { id: 3, name: '삭제', img: trashCan },
  ];

  return (
    <div className={styles.optionContainer}>
      {optionDatas.map((option, i) => {
        return (
          <div key={`option-${i}`}>
            <Option optionData={option} />
          </div>
        );
      })}
    </div>
  );
}
