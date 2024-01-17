import { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import { validateEmail, validatePassword } from '@/utils/validation';
import { checkDuplicateEmail, signup } from '@/utils/api';
import { getToken, setToken } from '@/utils/auth';
import TextField from '@/components/common/auth/TextField';
import AuthHeader from '@/components/common/auth/AuthHeader';
import AuthButton from '@/components/common/auth/AuthButton';
import SocialLogin from '@/components/common/auth/SocialLogin';
import styles from '@/styles/auth/auth.module.css';

export default function Signup() {
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
    passwordConfirmation: {
      isConfirmed: false,
      errorMsg: '',
    },
  });

  const getEmailErrorMessage = async (value: string) => {
    if (!form.email.value) return;
    try {
      const res = await checkDuplicateEmail(value);
      if (res.error) {
        setForm((prev) => ({
          ...prev,
          email: { value: '', errorMsg: res.error.message.toString() },
        }));
      } else {
        setForm((prev) => ({
          ...prev,
          email: { ...prev.email, errorMsg: '' },
        }));
      }
    } catch (e: any) {
      throw new Error(`getEmailErrorMessage: ${e}`);
    }
  };

  const emailOnBlurInput = (value: string): void => {
    if (!value) {
      setForm((prev) => ({
        ...prev,
        email: { value: '', errorMsg: '이메일을 입력하세요' },
      }));
      return;
    }
    if (!validateEmail(value)) {
      setForm((prev) => ({
        ...prev,
        email: { value: '', errorMsg: '올바른 이메일이 아닙니다.' },
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
        password: { ...prev.password, errorMsg: '비밀번호를 입력하세요.' },
      }));
    }
    if (!validatePassword(value)) {
      setForm((prev) => ({
        ...prev,
        password: {
          ...prev.password,
          errorMsg: '비밀번호는 영문, 숫자 조합 8자 이상 입력해 주세요.',
        },
      }));
      return;
    }
    setForm((prev) => ({
      ...prev,
      password: {
        value,
        errorMsg: '',
      },
    }));
  };

  const passwordConfirmOnBlurInput = (value: string): void => {
    if (!value) {
      setForm((prev) => ({
        ...prev,
        passwordConfirmation: {
          isConfirmed: false,
          errorMsg: '비밀번호를 입력해주세요',
        },
      }));
      return;
    }
    if (value !== form.password.value) {
      setForm((prev) => ({
        ...prev,
        passwordConfirmation: {
          isConfirmed: false,
          errorMsg: '비밀번호가 일치하지 않아요.',
        },
      }));
      return;
    }
    setForm((prev) => ({
      ...prev,
      passwordConfirmation: {
        isConfirmed: true,
        errorMsg: '',
      },
    }));
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!form.passwordConfirmation.isConfirmed || !form.email.value) return;
    const res = await signup({
      email: form.email.value,
      password: form.password.value,
    });
    if (res.accessToken) {
      setToken(res.accessToken);
      router.replace('/folder');
    }
  };

  useEffect(() => {
    getEmailErrorMessage(form.email.value);
  }, [form.email]);

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
          placeholder='영문, 숫자를 조합해 8자 이상 입력해 주세요'
          onBlurInput={passwordOnBlurInput}
          errorMsg={form.password.errorMsg}
        />
        <TextField
          label='비밀번호 확인'
          type='password'
          placeholder='비밀번호와 일치하는 값을 입력해주세요'
          onBlurInput={passwordConfirmOnBlurInput}
          errorMsg={form.passwordConfirmation.errorMsg}
        />
        <AuthButton text='회원가입' />
        <SocialLogin text='다른 방식으로 가입하기' />
      </form>
    </div>
  );
}
