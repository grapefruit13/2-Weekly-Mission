import { useContext, useEffect, useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { calCreatedAt, calCreatedDates } from '../../utils/date';
import { KebabContextProvider } from '../../contexts/KebabContext';
import CardContext from '../../contexts/CardContext';
import NoImg from '@/public/assets/icons/card/card_no-img.svg';
import kebab from '@/public/assets/icons/card/kebab.svg';
import CardInfo from './CardInfo';
import styles from '@/styles/card/card.module.css';
interface Props {
  id: string;
  createdAt: string;
  url: string;
  title: string;
  description: string;
  imageSource: string;
}

export default function Card({ link }: { link: Props }) {
  const { setLinkInfo } = useContext(CardContext);
  const { id, createdAt, url, title, description, imageSource } = link;
  const [mins, setMins] = useState('');
  const [createdDates, setCreatedDates] = useState({
    year: '',
    month: '',
    day: '',
  });
  const [isHovered, setIsHovered] = useState(false);

  const handleSetLinkInfo = () => {
    setLinkInfo({
      id: id,
      createdAt: createdAt,
      url: url,
      title: title,
      description: description,
      imageSource: imageSource,
    });
  };

  const getCreatedDates = () => {
    const [year, month, day] = calCreatedDates(createdAt);
    setCreatedDates((prev) => ({
      ...prev,
      year: year,
      month: month,
      day: day,
    }));
  };

  const getCreatedAt = () => {
    setMins(calCreatedAt(createdDates));
  };

  useEffect(() => {
    handleSetLinkInfo();
  }, []);

  useEffect(() => {
    getCreatedDates();
  }, [createdAt]);

  useEffect(() => {
    getCreatedAt();
  }, [createdDates]);

  return (
    <>
      <KebabContextProvider>
        <div className={styles.flexWrapper} id={`card-${id}`}>
          <div className={styles.cardImgWrapper}>
            <Link target="_blank" href={url}>
              {imageSource ? (
                <Image
                  className={
                    isHovered
                      ? `${styles.cardImg} ${styles.grow}`
                      : styles.cardImg
                  }
                  width={500}
                  height={253}
                  src={imageSource}
                  alt={`${title}-img`}
                  onMouseEnter={() => {
                    setIsHovered(true);
                  }}
                  onMouseLeave={() => {
                    setIsHovered(false);
                  }}
                />
              ) : (
                <Image
                  className={styles.cardImg}
                  width={500}
                  height={253}
                  src={NoImg}
                  alt={`${title}-img`}
                />
              )}
            </Link>
          </div>
          <CardInfo
            mins={mins}
            imgSrc={kebab}
            title={title}
            description={description}
            createdDates={createdDates}
          />
        </div>
      </KebabContextProvider>
    </>
  );
}
