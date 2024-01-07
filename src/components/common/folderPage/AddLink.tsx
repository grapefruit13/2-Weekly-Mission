import { useContext, useState } from "react";
import FolderContext from "../../../contexts/FolderContext";
import "../../../assets/styles/folderPage/AddLink.css";

export default function AddLink() {
  const { setClickedOption, setAddedLink, setIsModalOpen } =
    useContext(FolderContext);
  const [linkValue, setLinkValue] = useState("");

  const handleBtnClick = (
    e: React.MouseEvent<HTMLButtonElement, MouseEvent>
  ) => {
    e.preventDefault();
    setClickedOption({ addFolderLink: true });
    setAddedLink(linkValue);
  };

  return (
    <div className="add-link-container">
      <form className="add-link-wrapper">
        <input
          className="add-link"
          type="text"
          name="addLink"
          placeholder="링크를 추가해보세요"
          value={linkValue}
          onChange={(e) => setLinkValue(e.target.value)}
        />
        <button
          type="submit"
          className="add-link_add-btn"
          onClick={(e) => handleBtnClick(e)}
        >
          추가하기
        </button>
      </form>
    </div>
  );
}
