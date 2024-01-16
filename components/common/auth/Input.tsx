import { useState } from 'react';
import Image from 'next/image';
import styles from '@/styles/auth/auth.module.css';

export default function Input({
  type,
  name,
  placeholder,
  onClick,
  onBlurInput,
  errorMsg,
}: {
  type: string;
  name?: string;
  placeholder: string;
  onClick?: any;
  onBlurInput: (value: string) => any;
  errorMsg: string;
}) {
  const [isEyeClicked, setIsEyeClicked] = useState(false);

  const handleEyeClick = () => {
    setIsEyeClicked((prev) => !prev);
  };

  const handleOnBlur = (e: React.FocusEvent<HTMLInputElement, Element>) => {
    onBlurInput(e.target.value);
  };

  return (
    <>
      <div className={styles.inputBox}>
        <input
          placeholder={placeholder}
          onBlur={(e) => handleOnBlur(e)}
          name={type}
          type={type === 'password' && isEyeClicked ? 'text' : type}
          className={
            errorMsg
              ? `${styles.textfieldInput} ${styles.errorInput}`
              : styles.textfieldInput
          }
        />
        {type === 'password' && (
          <button
            type="button"
            className={styles.eyeToggleButton}
            onClick={handleEyeClick}
          >
            {isEyeClicked ? (
              <Image
                src="/assets/icons/auth/eye-on.svg"
                width={16}
                height={16}
                alt="eye-on"
              />
            ) : (
              <Image
                src="/assets/icons/auth/eye-off.svg"
                width={16}
                height={16}
                alt="eye-off"
              />
            )}
          </button>
        )}
      </div>
      {errorMsg && <p className={styles.errorMsg}>{errorMsg}</p>}
    </>
  );
}
