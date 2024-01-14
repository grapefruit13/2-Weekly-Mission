import styles from '@/styles/auth/authButton.module.css';

export default function AuthButton({ text }: any) {
  return (
    <div>
      <button type="submit" className={styles.authButton}>
        {text}
      </button>
    </div>
  );
}
