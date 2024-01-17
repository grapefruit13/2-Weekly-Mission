import { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import { signin } from '@/utils/api';
import { getToken, setToken } from '@/utils/auth';
import { validateEmail } from '@/utils/validation';
import AuthButton from '@/components/common/auth/AuthButton';
import AuthHeader from '@/components/common/auth/AuthHeader';
import SocialLogin from '@/components/common/auth/SocialLogin';
import TextField from '@/components/common/auth/TextField';
import styles from '@/styles/auth/auth.module.css';

export default function Signin() {
  const router = useRouter();
  const [form, setForm] = useState({
    email: {
      value: '',
      errorMsg: '',
    },
    password: {
      value: '',
      errorMsg: '',
    },
  });

  const emailOnBlurInput = (value: string): void => {
    if (!value) {
      setForm((prev) => ({
        ...prev,
        email: { value: '', errorMsg: '이메일을 입력해주세요' },
      }));
      return;
    }
    if (!validateEmail(value)) {
      setForm((prev) => ({
        ...prev,
        email: { value: '', errorMsg: '올바른 이메일 주소가 아닙니다.' },
      }));
      return;
    }
    setForm((prev) => ({
      ...prev,
      email: { value: value, errorMsg: '' },
    }));
  };

  const passwordOnBlurInput = (value: string): void => {
    if (!value) {
      setForm((prev) => ({
        ...prev,
        password: { ...prev.password, errorMsg: '비밀번호를 입력해주세요.' },
      }));
      return;
    }
    setForm((prev) => ({
      ...prev,
      password: { value, errorMsg: '' },
    }));
    return;
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!form.email.value || !form.password.value) return;
    const res = await signin({
      email: form.email.value,
      password: form.password.value,
    });
    if (res.accessToken) {
      setToken(res.accessToken);
      router.replace('/folder');
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
          label='이메일'
          type='email'
          placeholder='이메일을 입력해 주세요'
          onBlurInput={emailOnBlurInput}
          errorMsg={form.email.errorMsg}
        />
        <TextField
          label='비밀번호'
          type='password'
          placeholder='비밀번호를 입력해주세요'
          onBlurInput={passwordOnBlurInput}
          errorMsg={form.password.errorMsg}
        />
        <AuthButton text='로그인' />
        <SocialLogin text='소셜 로그인' />
      </form>
    </div>
  );
}
