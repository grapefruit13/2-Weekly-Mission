import { useContext } from "react";
import styled from "styled-components";
import FolderContext from "../../../contexts/FolderContext";

const Button = styled.button`
  margin: 0;
  background: inherit;
  border: none;
  cursor: pointer;
`;

interface Props {
  id: number;
  name: string;
  img: any;
}

export function Option({ optionData }: { optionData: Props }) {
  const { name, img } = optionData;
  const { setClickedOption } = useContext(FolderContext);

  const handleButtonClick = () => {
    if (name === "공유") setClickedOption({ shareFolder: true });
    if (name === "이름 변경") setClickedOption({ editFolderName: true });
    if (name === "삭제") setClickedOption({ deleteFolder: true });
  };

  return (
    <Button className="option-wrapper" onClick={handleButtonClick}>
      <img className="option-img" src={img} alt="option-img" />
      <div className="option-name">{name}</div>
    </Button>
  );
}

export default Option;
