import { useEffect, useState } from "react";
import styled from "styled-components";

const Input = styled.input`
  margin: auto;
  width: 280px;
  padding: 18px 15px;
  border-radius: 8px;
  background: var(--Linkbrary-white, #fff);
  border: 1px solid var(--Linkbrary-gray20, #ccd5e3);
  color: var(--Linkbrary-gray100, #373740);
  font-size: 16px;
  font-weight: 400;
  line-height: 24px;

  ::placeholder {
    color: var(--Linkbrary-gray60, #9fa6b2);
    font-size: 16px;
    font-weight: 400;
    line-height: 24px;
  }

  &:focus {
    border: 1px solid var(--Linkbrary-primary-color, #6d6afe);
  }
`;

export default function ModalInput({ currentFolder }: any) {
  const [value, setValue] = useState("");

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setValue(e.target.value);
  };

  useEffect(() => {
    if (!currentFolder) return;
    setValue(currentFolder);
  }, []);

  return (
    <Input
      placeholder="내용 입력"
      defaultValue={value}
      onChange={(e) => handleInputChange(e)}
    />
  );
}
