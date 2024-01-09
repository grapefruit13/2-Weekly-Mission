import { useState } from "react";
import styled from "styled-components";

// input 컴포넌트에 값이 없는 경우 placeholder 값이 보입니다.
// focus in 하면 파랑색 테두리가 보입니다.
// 눈 모양 아이콘을 누르면 비밀번호 가리기/보기 기능이 토글됩니다. -> 눈모양 있는 거랑 없는 것 두 개 만들어야함
// 눈 버튼누르면 input type=password 로 변경 <-이것도 state로 관리
// 값이 에러케이스일 경우 빨간 테두리와 에러 메시지가 보입니다. -> focus out할 때 value 에러케이스 검사.
// input 밑에 에러메시지 div를 미리 만들어두고 display 속성을 바꿔서 보여줬다가 없앴다가 하기
// focus out하면 실행할 함수를 설정할 수 있습니다.

const Input = styled.input`
  border: 1px solid gray;

  &:focus {
    border: 1px solid purple;
  }
`;

const ErrorMsg = styled.div`
  color: red;
  display: none;
`;

export default function LoginInput() {
  const [inputValue, setInputValue] = useState("");

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setInputValue(e.target.value);
  };

  return (
    <>
      <Input placeholder="내용 입력" onChange={(e) => handleInputChange(e)} />
      <ErrorMsg>내용을 다시 작성해주세요</ErrorMsg>
    </>
  );
}
