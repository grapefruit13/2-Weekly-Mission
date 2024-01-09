import styles from '@/styles/folderPage/noLinks.module.css';

interface Props {
  msg: string;
}

export function Nolinks({ msg }: Props) {
  return <div className={styles.noLinks}>{msg}</div>;
}

export default Nolinks;
