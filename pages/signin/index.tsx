import { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import { postSignin } from '@/utils/api';
import { getToken, setToken } from '@/utils/auth';
import { validateEmail } from '@/utils/validation';
import AuthButton from '@/components/common/auth/AuthButton';
import AuthHeader from '@/components/common/auth/AuthHeader';
import SocialLogin from '@/components/common/auth/SocialLogin';
import TextField from '@/components/common/auth/TextField';
import styles from '@/styles/auth/auth.module.css';

export default function Signin() {
  const router = useRouter();
  const [authInfo, setAuthInfo] = useState({
    email: '',
    password: '',
  });
  const [errorMsg, setErrorMsg] = useState({
    email: '',
    password: '',
  });

  const emailOnBlurInput = (value: string): void => {
    if (!value) {
      setErrorMsg((prev) => ({
        ...prev,
        email: '이메일을 입력해주세요',
      }));
      setAuthInfo((prev) => ({ ...prev, email: '' }));
      return;
    }
    if (!validateEmail(value)) {
      setErrorMsg((prev) => ({
        ...prev,
        email: '올바른 이메일 주소가 아닙니다.',
      }));
      setAuthInfo((prev) => ({ ...prev, email: '' }));
      return;
    }
    setErrorMsg((prev) => ({
      ...prev,
      email: '',
    }));
    setAuthInfo((prev) => ({ ...prev, email: value }));
  };

  const passwordOnBlurInput = (value: string): void => {
    if (!value) {
      setErrorMsg((prev) => ({
        ...prev,
        password: '비밀번호를 입력해주세요',
      }));
      return;
    }
    setErrorMsg((prev) => ({
      ...prev,
      password: '',
    }));
    setAuthInfo((prev) => ({ ...prev, password: value }));
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!authInfo.email || !authInfo.password) return;
    try {
      const res = await postSignin({
        email: authInfo.email,
        password: authInfo.password,
      });
      console.log(res);
      if (res.accessToken) {
        setToken(res.accessToken);
        router.replace('/folder');
      } else {
        return;
      }
    } catch (e: any) {
      throw new Error(`signup handleSubmit: ${e}`);
    }
  };

  useEffect(() => {
    const accessToken = getToken();
    if (!accessToken) return;
    router.replace('/folder');
  }, []);

  return (
    <div className={styles.body}>
      <form className={styles.authContainer} onSubmit={(e) => handleSubmit(e)}>
        <AuthHeader />
        <TextField
          label="이메일"
          type="email"
          placeholder="이메일을 입력해 주세요"
          onBlurInput={emailOnBlurInput}
          errorMsg={errorMsg.email}
        />
        <TextField
          label="비밀번호"
          type="password"
          placeholder="비밀번호를 입력해주세요"
          onBlurInput={passwordOnBlurInput}
          errorMsg={errorMsg.password}
        />
        <AuthButton text="로그인" />
        <SocialLogin text="소셜 로그인" />
      </form>
    </div>
  );
}
