import { useContext } from "react";
import styled from "styled-components";
import ModalInput from "./ModalInput";
import ModalButton from "./ModalButton";
import IconsBox from "./IconsBox";
import FolderList from "./FolderList";
import FolderContext from "../../../../contexts/FolderContext";

const Background = styled.div`
  position: fixed;
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 999;
  top: 0;
  right: 0;
  width: 100%;
  height: 100vh;
  background: rgba(0, 0, 0, 0.4);
  box-shadow: 0px 4px 25px 0px rgba(0, 0, 0, 0.08);
`;

const Container = styled.div`
  position: relative;
  display: inline-flex;
  flex-direction: column;
  margin: auto;
  width: 360px;
  gap: 24px;
  padding: 32px 40px;
  border-radius: 15px;
  border: 1px solid var(--Linkbrary-gray20, #ccd5e3);
  background: var(--Linkbrary-white, #fff);
`;

const Title = styled.div`
  color: var(--Linkbrary-gray100, #373740);
  font-family: Pretendard;
  font-size: 20px;
  font-style: normal;
  font-weight: 700;
  line-height: normal;
`;

const InputContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 15px;
`;

const ButtonContainer = styled.button`
  position: absolute;
  top: 16px;
  right: 16px;
  background: inherit;
  border: none;
  cursor: pointer;
  padding: 0;
  margin: 0;
`;

const TitleContainer = styled.div`
  display: flex;
  width: 280px;
  flex-direction: column;
  align-items: center;
  gap: 8px;
`;

const SubTitle = styled.div`
  color: var(--Linkbrary-gray60, #9fa6b2);
  text-align: center;
  font-family: Pretendard;
  font-size: 14px;
  font-style: normal;
  font-weight: 400;
  line-height: 22px;
`;

export default function Modal({
  title,
  input = false,
  button,
  folderName,
  subtitle = "",
  folderLists,
  share,
}: {
  title: string;
  input?: boolean;
  button?: {
    color: string;
    text: string;
  };
  folderName?: string;
  subtitle?: string;
  folderLists?: object[];
  share?: boolean;
}) {
  const Close = require("../../../../assets/icons/modal/close.svg").default;
  const { setClickedOption } = useContext(FolderContext);

  return (
    <>
      <Background>
        <Container>
          <TitleContainer>
            <Title>{title}</Title>
            {subtitle && <SubTitle>{subtitle}</SubTitle>}
          </TitleContainer>
          <ButtonContainer>
            <img
              src={Close}
              alt="close-icons"
              onClick={() => {
                setClickedOption({
                  addLink: false,
                  shareLink: false,
                  editLinkName: false,
                  deleteLink: false,
                });
              }}
            />
          </ButtonContainer>
          <InputContainer>
            {input && <ModalInput currentFolder={folderName} />}
            {button?.color === "red" && (
              <ModalButton color={button.color} text={button.text} />
            )}
          </InputContainer>
          {folderLists && <FolderList folderLists={folderLists} />}
          {button?.color === "blue" && (
            <ModalButton color={button.color} text={button.text} />
          )}
          {share && <IconsBox />}
        </Container>
      </Background>
    </>
  );
}
