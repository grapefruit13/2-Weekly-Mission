import Image from 'next/image';
import Kakao from '/public/assets/icons/modal/kakao.svg';
import Facebook from '/public/assets/icons/modal/facebook.svg';
import Share from '/public/assets/icons/modal/share.svg';
import styles from '@/styles/folderPage/modal/iconsBox.module.css';

export default function IconsBox() {
  const currentURL = window.location.href;

  const handleCopyClipBoard = async (text: string) => {
    try {
      await navigator.clipboard.writeText(text);
    } catch (e: any) {
      throw new Error(e);
    }
  };

  return (
    <>
      <div className={styles.container}>
        <div className={styles.iconContainer}>
          <Image src={Kakao} width={20} height={20} alt="kakao-icon" />
          <span className={styles.title}>카카오톡</span>
        </div>
        <div className={styles.iconContainer}>
          <Image src={Facebook} width={20} height={20} alt="facebook-icon" />
          <span className={styles.title}>페이스북</span>
        </div>
        <div className={styles.iconContainer}>
          <Image
            src={Share}
            width={20}
            height={20}
            alt="share-icon"
            onClick={() => {
              handleCopyClipBoard(currentURL);
            }}
          />
          <span className={styles.title}>링크 복사</span>
        </div>
      </div>
    </>
  );
}
