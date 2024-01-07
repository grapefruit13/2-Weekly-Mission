import { useContext } from "react";
import styled from "styled-components";
import Dropdown from "./folderPage/Dropdown";
import KebabContext from "../../contexts/KebabContext";

const Container = styled.div`
  position: relative;
  display: flex;
  flex-direction: column;
  text-align: left;
  justify-content: space-between;
  gap: 0.62rem;
  padding: 15px 20px;
  height: 135px;
`;

interface Props {
  mins: string;
  imgSrc: string;
  title: string;
  description: string;
  createdDates: {
    year: string;
    month: string;
    day: string;
  };
}

export default function CardInfo({
  mins,
  imgSrc,
  title,
  description,
  createdDates,
}: Props) {
  const { setIsKebabClicked, isKebabClicked } = useContext(KebabContext);

  const handleKebabClick = () => {
    setIsKebabClicked((prev: boolean) => !prev);
  };

  return (
    <Container>
      <div className="times-ago-wrapper">
        <div className="mins">{mins}</div>
        <img
          className="kebab"
          src={imgSrc}
          alt="kebab"
          onClick={handleKebabClick}
          style={{ cursor: "pointer" }}
        />
        {isKebabClicked && <Dropdown />}
      </div>
      <div className="infos">
        <div className="title">{title}</div>
        <div className="description">{description}</div>
      </div>
      <div className="created">
        {createdDates.year}. {createdDates.month}. {createdDates.day}
      </div>
    </Container>
  );
}
