import Input from '@/components/common/auth/Input';
import styles from '@/styles/auth/auth.module.css';

export default function TextField({
  label,
  type,
  placeholder,
  onBlurInput,
  onChangeInput,
  errorMsg,
}: {
  label: string;
  type: string;
  placeholder: string;
  onBlurInput: (value: string) => any;
  onChangeInput?: (value: string) => void;
  errorMsg: string;
}) {
  return (
    <div className={styles.textfieldContainer}>
      <label className={styles.textfieldLabel}>{label}</label>
      <Input
        type={type}
        placeholder={placeholder}
        onBlurInput={onBlurInput}
        onChangeInput={onChangeInput}
        errorMsg={errorMsg}
      />
    </div>
  );
}
