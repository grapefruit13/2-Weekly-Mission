import { useEffect, useMemo, useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { calCreatedAt, calCreatedDates } from '@/utils/date';
import { KebabContextProvider } from '@/contexts/KebabContext';
import CardInfo from '@/components/common/CardInfo';
import NoImg from '@/public/assets/icons/card/card_no-img.svg';
import kebab from '@/public/assets/icons/card/kebab.svg';
import styles from '@/styles/card/card.module.css';

interface Link {
  link: {
    id: string;
    createdAt: string;
    url: string;
    title: string;
    description: string;
    imageSource: string;
  };
}

export default function Card({ link }: Link) {
  const { id, createdAt, url, title, description, imageSource } = link;
  const [linkInfo, setLinkInfo] = useState({
    id: '',
    createdAt: '',
    url: '',
    title: '',
    description: '',
    imageSource: '',
  });
  const [mins, setMins] = useState('');
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

  const getCreatedAt = useMemo(() => {
    const [year, month, day] = calCreatedDates(createdAt);
    setMins(calCreatedAt(year, month, day));
    return { year, month, day };
  }, [createdAt]);

  useEffect(() => {
    handleSetLinkInfo();
  }, []);

  return (
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
          createdDates={getCreatedAt}
          linkInfo={linkInfo}
        />
      </div>
    </KebabContextProvider>
  );
}
