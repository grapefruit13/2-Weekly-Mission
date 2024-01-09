import { useContext } from "react";
import styled from "styled-components";
import KebabContext from "../../../contexts/KebabContext";
import Modal from "./modal/Modal";
import CardContext from "../../../contexts/CardContext";

const Container = styled.div`
  position: absolute;
  top: 30px;
  right: -40px;
  display: inline-flex;
  flex-direction: column;
  align-items: stretch;
  text-align: center;
  background: var(--gray-light-gray-00, #fff);
  box-shadow: 0px 2px 8px 0px rgba(51, 50, 54, 0.1);
`;

const Item = styled.div`
  padding: 7px 12px;
  gap: 10px;
  color: var(--gray-light-gray-100, #333236);
  font-size: 14px;
  font-weight: 400;

  &:hover {
    color: var(--Linkbrary-primary-color, #6d6afe);
    background: var(--Linkbrary-gray10, #e7effb);
  }
`;

export default function Dropdown() {
  const { clickedKebabOption, setClickedKebabOption } =
    useContext(KebabContext);
  const { linkInfo } = useContext(CardContext);

  return (
    <>
      <Container>
        {clickedKebabOption.delete && (
          <Modal
            title="링크 삭제"
            subtitle={linkInfo.url}
            button={{ color: "red", text: "삭제하기" }}
          />
        )}
        <Item
          onClick={() => {
            setClickedKebabOption({ delete: true });
          }}
        >
          삭제하기
        </Item>
        <Item
          onClick={() => {
            setClickedKebabOption({ addToFolder: true });
          }}
        >
          폴더에 추가
        </Item>
      </Container>
    </>
  );
}
