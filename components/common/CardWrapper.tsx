import Card from '@/components/common/Card';
import styles from '@/styles/card/cardWrapper.module.css';
import Nolinks from '@/components/common/folderPage/NoLinks';

export default function CardWrapper({
  links,
}: {
  links: {
    id: string;
    createdAt: string;
    url: string;
    title: string;
    imageSource: string;
    description: string;
  }[];
}) {
  return (
    <div className={styles.wrapper}>
      {!links?.length && <Nolinks msg="검색한 결과가 없습니다" />}
      {links?.map((link) => {
        return (
          <div key={link.id}>
            <Card link={link} />
          </div>
        );
      })}
    </div>
  );
}
