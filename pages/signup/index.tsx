import { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import { validateEmail, validatePassword } from '@/utils/validation';
import { checkDuplicateEmail, postSignup } from '@/utils/api';
import { getToken, setToken } from '@/utils/auth';
import TextField from '@/components/common/auth/TextField';
import AuthHeader from '@/components/common/auth/AuthHeader';
import AuthButton from '@/components/common/auth/AuthButton';
import SocialLogin from '@/components/common/auth/SocialLogin';
import styles from '@/styles/auth/auth.module.css';

export default function Signup() {
  const router = useRouter();
  const [authInfo, setAuthInfo] = useState({
    email: '',
    password: '',
    isPasswordConfirmed: false,
  });
  const [errorMsg, setErrorMsg] = useState({
    email: '',
    password: '',
    passwordConfirmation: '',
  });

  const getEmailErrorMessage = async (value: string) => {
    if (!authInfo.email) return;
    try {
      const res = await checkDuplicateEmail(value);
      if (res.error) {
        setErrorMsg((prev) => ({
          ...prev,
          email: res.error.message.toString(),
        }));
        setAuthInfo((prev) => ({
          ...prev,
          email: '',
        }));
      } else {
        setErrorMsg((prev) => ({
          ...prev,
          email: '',
        }));
      }
    } catch (e: any) {
      throw new Error(`getEmailErrorMessage: ${e}`);
    }
  };

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
        email: '올바른 이메일이 아닙니다.',
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
    if (!validatePassword(value)) {
      setErrorMsg((prev) => ({
        ...prev,
        password: '비밀번호는 영문, 숫자 조합 8자 이상 입력해 주세요.',
      }));
      return;
    }
    setErrorMsg((prev) => ({
      ...prev,
      password: '',
    }));
    setAuthInfo((prev) => ({ ...prev, password: value }));
  };

  const passwordConfirmOnBlurInput = (value: string): void => {
    if (!value) {
      setErrorMsg((prev) => ({
        ...prev,
        passwordConfirmation: '비밀번호를 입력해주세요',
      }));
      setAuthInfo((prev) => ({
        ...prev,
        isPasswordConfirmed: false,
      }));
      return;
    }
    if (value !== authInfo.password) {
      setErrorMsg((prev) => ({
        ...prev,
        passwordConfirmation: '비밀번호가 일치하지 않아요.',
      }));
      setAuthInfo((prev) => ({
        ...prev,
        isPasswordConfirmed: false,
      }));
      return;
    }
    setErrorMsg((prev) => ({
      ...prev,
      passwordConfirmation: '',
    }));
    setAuthInfo((prev) => ({
      ...prev,
      isPasswordConfirmed: true,
    }));
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!authInfo.isPasswordConfirmed || !authInfo.email) return;
    try {
      const res = await postSignup({
        email: authInfo.email,
        password: authInfo.password,
      });
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
    getEmailErrorMessage(authInfo.email);
  }, [authInfo.email]);

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
          placeholder="영문, 숫자를 조합해 8자 이상 입력해 주세요"
          onBlurInput={passwordOnBlurInput}
          errorMsg={errorMsg.password}
        />
        <TextField
          label="비밀번호 확인"
          type="password"
          placeholder="비밀번호와 일치하는 값을 입력해주세요"
          onBlurInput={passwordConfirmOnBlurInput}
          errorMsg={errorMsg.passwordConfirmation}
        />
        <AuthButton text="회원가입" />
        <SocialLogin text="다른 방식으로 가입하기" />
      </form>
    </div>
  );
}
