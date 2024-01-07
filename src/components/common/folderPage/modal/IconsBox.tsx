import styled from "styled-components";
import Kakao from "../../../../assets/icons/modal/kakao.svg";
import Facebook from "../../../../assets/icons/modal/facebook.svg";
import Share from "../../../../assets/icons/modal/share.svg";

const Container = styled.div`
  display: flex;
  justify-content: center;
  gap: 32px;
`;

const IconContainer = styled.button`
  margin: auto;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 10px;
  background: inherit;
  border: none;
  cursor: pointer;
  padding: 0;
  margin: 0;
`;

const Title = styled.div`
  color: var(--Linkbrary-gray100, #373740);
  text-align: center;
  font-family: Inter;
  font-size: 13px;
  font-weight: 400;
  line-height: 15px;
`;

export default function IconsBox() {
  const currentURL = window.location.href;

  const handleCopyClipBoard = async (text: string) => {
    try {
      await navigator.clipboard.writeText(text);
    } catch (e: any) {
      throw new Error(e);
    }
  };

  return (
    <>
      <Container>
        <IconContainer>
          <img src={Kakao} alt="kakao-icon" />
          <Title>카카오톡</Title>
        </IconContainer>
        <IconContainer>
          <img src={Share} alt="share-icon" />
          <Title>페이스북</Title>
        </IconContainer>
        <IconContainer>
          <img
            src={Facebook}
            alt="facebook-icon"
            onClick={() => {
              handleCopyClipBoard(currentURL);
            }}
          />
          <Title>링크 복사</Title>
        </IconContainer>
      </Container>
    </>
  );
}
