import Image from 'next/image';
import styles from '@/styles/auth/socialLogin.module.css';
import Link from 'next/link';

export default function SocialLogin({ text }: any) {
  return (
    <div className={styles.socialLoginContainer}>
      <span className={styles.title}>{text}</span>
      <div className={styles.iconWrapper}>
        <Link href="https://www.google.com">
          <Image
            src="/assets/icons/auth/google.svg"
            width={42}
            height={42}
            alt="google"
          />
        </Link>
        <Link href="https://www.kakaocorp.com/page">
          <Image
            src="/assets/icons/auth/kakaotalk.svg"
            width={42}
            height={42}
            alt="kakaotalk"
          />
        </Link>
      </div>
    </div>
  );
}
