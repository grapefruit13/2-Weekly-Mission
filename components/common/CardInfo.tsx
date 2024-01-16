import { useState } from 'react';
import Image from 'next/image';
import { useRouter } from 'next/router';
import Dropdown from '@/components/common/folderPage/Dropdown';
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
  linkInfo: {
    id: string;
    createdAt: string;
    url: string;
    title: string;
    description: string;
    imageSource: string;
  };
}

export default function CardInfo({
  mins,
  imgSrc,
  title,
  description,
  createdDates,
  linkInfo,
}: Props) {
  const [isKebabClicked, setIsKebabClicked] = useState(false);
  const router = useRouter();

  const handleKebabClick = () => {
    if (router.pathname !== '/') {
      setIsKebabClicked((prev: boolean) => !prev);
    }
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
          style={router.pathname !== '/' ? { cursor: 'pointer' } : undefined}
        />
        {isKebabClicked && <Dropdown linkInfo={linkInfo} />}
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
