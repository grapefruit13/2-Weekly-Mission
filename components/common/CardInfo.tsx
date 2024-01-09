import Image from 'next/image';
import { useContext } from 'react';
import Dropdown from './folderPage/Dropdown';
import KebabContext from '../../contexts/KebabContext';
import styles from '@/styles/card/card.module.css';

interface Props {
  mins: string;
  imgSrc: string;
  title: string;
  description: string;
  createdDates: {
    year: string;
    month: string;
    day: string;
  };
}

export default function CardInfo({
  mins,
  imgSrc,
  title,
  description,
  createdDates,
}: Props) {
  const { setIsKebabClicked, isKebabClicked } = useContext(KebabContext);

  const handleKebabClick = () => {
    setIsKebabClicked((prev: boolean) => !prev);
  };

  return (
    <div className={styles.cardInfoContainer}>
      <div className={styles.timesAgoWrapper}>
        <div className={styles.mins}>{mins}</div>
        <Image
          width={21}
          height={17}
          src={imgSrc}
          alt="kebab"
          onClick={handleKebabClick}
          style={{ cursor: 'pointer' }}
        />
        {isKebabClicked && <Dropdown />}
      </div>
      <div>
        <div className={styles.title}>{title}</div>
        <div className={styles.description}>{description}</div>
      </div>
      <div className={styles.created}>
        {createdDates.year}. {createdDates.month}. {createdDates.day}
      </div>
    </div>
  );
}
