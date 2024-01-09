import Sns from './Sns';
import FooterSnsDatas from './FooterSnsDatas';
import styles from '@/styles/footer/footer.module.css';
import Link from 'next/link';

export default function Footer() {
  const getThisYear = () => {
    const date = new Date();
    const thisYear = date.getFullYear();
    return thisYear;
  };

  return (
    <>
      <div className={styles.wrapper}>
        <span className={styles.codeit}>©codeit - {getThisYear()}</span>
        <div className={styles.info}>
          <span className={styles.privacy}>
            <Link href="/privacy">Privacy Policy</Link>
          </span>
          <span className={styles.faq}>
            <Link href="/faq">FAQ</Link>
          </span>
        </div>
        <div className={styles.sns}>
          {FooterSnsDatas.map((data) => {
            return (
              <div key={`sns-${data.id}`}>
                <Sns footerSnsData={data} />
              </div>
            );
          })}
        </div>
      </div>
    </>
  );
}
