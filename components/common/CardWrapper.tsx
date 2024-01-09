import { CardContextProvider } from '../../contexts/CardContext';
import Card from './Card';
import styles from '@/styles/card/cardWrapper.module.css';

interface Props {
  links: {
    id: string;
    createdAt: string;
    url: string;
    title: string;
    imageSource: string;
    description: string;
  }[];
}

export default function CardWrapper({ links }: Props) {
  return (
    <div className={styles.wrapper}>
      {links.map((link) => {
        return (
          <div key={link.id}>
            <CardContextProvider>
              <Card link={link} />
            </CardContextProvider>
          </div>
        );
      })}
    </div>
  );
}