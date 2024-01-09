import { useEffect, useState } from 'react';
import styles from '@/styles/folderPage/modal/modalInput.module.css';

export default function ModalInput({ currentFolder }: any) {
  const [value, setValue] = useState('');

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setValue(e.target.value);
  };

  useEffect(() => {
    if (!currentFolder) return;
    setValue(currentFolder);
  }, []);

  return (
    <input
      className={styles.input}
      placeholder="내용 입력"
      defaultValue={value}
      onChange={(e) => handleInputChange(e)}
    />
  );
}
