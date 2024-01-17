import { useState } from 'react';
import Image from 'next/image';
import styles from '@/styles/auth/auth.module.css';

export default function Input({
  type,
  placeholder,
  onBlurInput,
  errorMsg,
}: {
  type: string;
  placeholder: string;
  onBlurInput: (value: string) => any;
  errorMsg: string;
}) {
  const [isPasswordVisible, setIsPasswordVisible] = useState(false);
  const [inputValue, setInputValue] = useState('');

  const handleEyeClick = () => {
    setIsPasswordVisible((prev) => !prev);
  };

  const handleOnChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setInputValue(e.target.value);
  };

  const handleOnBlur = () => {
    onBlurInput(inputValue);
  };

  return (
    <>
      <div className={styles.inputBox}>
        <input
          placeholder={placeholder}
          onChange={(e) => handleOnChange(e)}
          onBlur={handleOnBlur}
          name={type}
          type={type === 'password' && isPasswordVisible ? 'text' : type}
          className={
            errorMsg
              ? `${styles.textfieldInput} ${styles.errorInput}`
              : styles.textfieldInput
          }
        />
        {type === 'password' && (
          <button
            type='button'
            className={styles.eyeToggleButton}
            onClick={handleEyeClick}
          >
            {isPasswordVisible ? (
              <Image
                src='/assets/icons/auth/eye-on.svg'
                width={16}
                height={16}
                alt='eye-on'
              />
            ) : (
              <Image
                src='/assets/icons/auth/eye-off.svg'
                width={16}
                height={16}
                alt='eye-off'
              />
            )}
          </button>
        )}
      </div>
      {errorMsg && <p className={styles.errorMsg}>{errorMsg}</p>}
    </>
  );
}
