import { useContext } from 'react';
import Image from 'next/image';
import FolderContext from '@/contexts/FolderContext';
import ModalInput from '@/components/common/folderPage/modal/ModalInput';
import ModalButton from '@/components/common/folderPage/modal/ModalButton';
import IconsBox from '@/components/common/folderPage/modal/IconsBox';
import FolderList from '@/components/common/folderPage/modal/FolderList';
import Close from '/public/assets/icons/modal/close.svg';
import styles from '@/styles/folderPage/modal/modal.module.css';

export default function Modal({
  title,
  input = false,
  button,
  folderName,
  subtitle = '',
  folderList,
  share,
  closeKebab,
}: {
  title: string;
  input?: boolean;
  button?: {
    color: string;
    text: string;
  };
  folderName?: string;
  subtitle?: string;
  folderList?: object[];
  share?: boolean;
  closeKebab?: any;
}) {
  const { setClickedOption } = useContext(FolderContext);

  return (
    <div className={styles.background}>
      <div className={styles.container}>
        <div className={styles.titleWrapper}>
          <span className={styles.title}>{title}</span>
          {subtitle && <span className={styles.subtitle}>{subtitle}</span>}
        </div>
        <button className={styles.button}>
          <Image
            src={Close}
            width={24}
            height={24}
            alt="close-icons"
            onClick={() => {
              setClickedOption({
                addLink: false,
                shareLink: false,
                editLinkName: false,
                deleteLink: false,
              });
              closeKebab?.();
            }}
          />
        </button>
        <div className={styles.inputWrapper}>
          {input && <ModalInput currentFolder={folderName} />}
          {button?.color === 'red' && (
            <ModalButton color={button.color} text={button.text} />
          )}
        </div>
        {folderList && <FolderList folderList={folderList} />}
        {button?.color === 'blue' && (
          <ModalButton color={button.color} text={button.text} />
        )}
        {share && <IconsBox />}
      </div>
    </div>
  );
}
