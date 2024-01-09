import { useContext } from 'react';
import ModalInput from './ModalInput';
import ModalButton from './ModalButton';
import IconsBox from './IconsBox';
import FolderList from './FolderList';
import FolderContext from '../../../../contexts/FolderContext';
import Image from 'next/image';
import Close from '/public/assets/icons/modal/close.svg';
import styles from '@/styles/folderPage/modal/modal.module.css';

export default function Modal({
  title,
  input = false,
  button,
  folderName,
  subtitle = '',
  folderLists,
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
  folderLists?: object[];
  share?: boolean;
  closeKebab?: any;
}) {
  const { setClickedOption } = useContext(FolderContext);

  return (
    <>
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
                if (closeKebab) {
                  closeKebab();
                }
              }}
            />
          </button>
          <div className={styles.inputWrapper}>
            {input && <ModalInput currentFolder={folderName} />}
            {button?.color === 'red' && (
              <ModalButton color={button.color} text={button.text} />
            )}
          </div>
          {folderLists && <FolderList folderLists={folderLists} />}
          {button?.color === 'blue' && (
            <ModalButton color={button.color} text={button.text} />
          )}
          {share && <IconsBox />}
        </div>
      </div>
    </>
  );
}
