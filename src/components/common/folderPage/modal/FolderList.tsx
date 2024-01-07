import styled from "styled-components";
import Check from "../../../../assets/icons/modal/check.svg";

const Container = styled.div`
  display: flex;
  flex-direction: column;
  gap: 4px;
`;

const ItemContainer = styled.div`
  width: 264px;
  display: flex;
  align-items: center;
  gap: 8px;
  padding: 8px;

  &:hover {
    border-radius: 8px;
    background: var(--Linkbrary-bg, #f0f6ff);
    background-image: url(${Check});
    background-size: 14px;
    background-repeat: no-repeat;
    background-position: right 8px center;
  }
`;

const Title = styled.div`
  color: var(--Linkbrary-gray100, #373740);
  font-size: 16px;
  font-weight: 400;
  line-height: 24px; /* 150% */
`;

const Count = styled.div`
  color: var(--Linkbrary-gray60, #9fa6b2);
  font-family: Pretendard;
  font-size: 14px;
  font-style: normal;
  font-weight: 400;
  line-height: normal;
`;

export default function FolderList({ folderLists }: any) {
  return (
    <>
      <Container>
        {folderLists &&
          folderLists.map((folder: any) => (
            <ItemContainer key={`item-${folder.id}`}>
              <Title>{folder.name}</Title>
              <Count>{folder?.link?.count}개 링크</Count>
            </ItemContainer>
          ))}
      </Container>
    </>
  );
}
