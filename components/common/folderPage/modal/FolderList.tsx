import styles from '@/styles/folderPage/modal/folderList.module.css';

export default function FolderList({ folderList }: any) {
  return (
    <>
      <div className={styles.container}>
        {folderList &&
          folderList.map((folder: any) => (
            <div className={styles.itemContainer} key={`item-${folder.id}`}>
              <span className={styles.title}>{folder.name}</span>
              <span className={styles.count}>{folder?.link?.count}개 링크</span>
            </div>
          ))}
      </div>
    </>
  );
}
