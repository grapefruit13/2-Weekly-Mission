import { useContext, useEffect, useState } from "react";
import { getData } from "../utils/api";
import { Footer } from "../components/common/Footer";
import AddLink from "../components/common/folderPage/AddLink";
import Header from "../components/common/Header";
import Folders from "../components/common/folderPage/Folders";
import SearchBar from "../components/common/SearchBar";
import CardWrapper from "../components/common/CardWrapper";
import FolderOptions from "../components/common/folderPage/FolderOptions";
import Nolinks from "../components/common/folderPage/NoLinks";
import add from "../assets/icons/card/add.svg";
import "../assets/styles/header/MainHeader.css";
import "../assets/styles/Responsive.css";
import styled from "styled-components";
import Modal from "../components/common/folderPage/modal/Modal";
import FolderContext from "../contexts/FolderContext";

const AddBtn = styled.button`
  margin: 0;
  background: inherit;
  cursor: pointer;
  border: none;
`;

function FolderPage() {
  const { addedLink, clickedOption, setClickedOption } =
    useContext(FolderContext);
  const [profileDatas, setProfileDatas] = useState({
    id: 0,
    created_at: "",
    name: "",
    image_source: "",
    email: "",
    auth_id: "",
  });
  const [links, setLinks] = useState([]);
  const [folderLists, setFolderLists] = useState([{ name: "전체" }]);
  const [currentFolderId, setCurrentFolderId] = useState("");
  const [currentFolderName, setCurrentFolderName] = useState<string>("전체");

  const getUserData = async () => {
    try {
      const result = await getData("users/1");
      const { id, created_at, name, image_source, email, auth_id } =
        result.data[0];

      setProfileDatas((prevProfileDatas) => ({
        ...prevProfileDatas,
        id: id,
        created_at: created_at,
        name: name,
        image_source: image_source,
        email: email,
        auth_id: auth_id,
      }));
    } catch (e) {
      throw Error(`Folderpage getUserData ${e}`);
    }
  };

  const getTotalLinksData = async () => {
    try {
      const result = await getData("users/1/links");
      const { data } = result;
      const datas = data.map((link: any) => ({
        ...link,
        createdAt: link.created_at,
        imageSource: link.image_source,
      }));
      setLinks(datas);
    } catch (e) {
      throw Error(`Folderpage의 getLinksData에서 ${e} 발생`);
    }
  };

  const getFolderLists = async () => {
    try {
      const result = await getData("users/1/folders");
      const { data } = result;
      data.unshift({ name: "전체" });
      setFolderLists(data);
    } catch (e) {
      throw Error(`Folderpage의 getFolderLists에서 ${e} 발생`);
    }
  };

  const getFolder = async () => {
    try {
      const result = await getData(`users/1/links?folderId=${currentFolderId}`);
      const { data } = result;
      const datas = data.map((link: any) => ({
        ...link,
        createdAt: link.created_at,
        imageSource: link.image_source,
      }));
      setLinks(datas);
    } catch (e) {
      throw Error(`Folderpage의 handleFolderClick의 getFolder에서 ${e} 발생`);
    }
  };

  const handleFolderClick = (e: any) => {
    setCurrentFolderName(e.target.textContent);
    if (e.target.textContent === "전체") {
      getTotalLinksData();
      return;
    }
    const clikedFolder: any = folderLists.filter(
      (folder: any) => folder.name === e.target.textContent
    );
    setCurrentFolderId(clikedFolder[0].id);
  };

  useEffect(() => {
    getUserData();
    getTotalLinksData();
    getFolderLists();
  }, []);

  useEffect(() => {
    getFolder();
  }, [currentFolderId]);

  return (
    <>
      {clickedOption.addFolderLink && addedLink && (
        <Modal
          title="폴더에 추가"
          button={{ color: "blue", text: "추가하기" }}
          subtitle={addedLink}
          folderLists={folderLists}
        />
      )}
      {clickedOption.shareFolder && (
        <Modal title="폴더 공유" subtitle={currentFolderName} share />
      )}
      {clickedOption.editFolderName && (
        <Modal
          title="폴더 이름 변경"
          folderName={currentFolderName}
          input
          button={{ color: "blue", text: "변경하기" }}
        />
      )}
      {clickedOption.deleteFolder && (
        <Modal
          title="폴더 삭제"
          subtitle={currentFolderName}
          button={{ color: "red", text: "삭제하기" }}
        />
      )}
      {clickedOption.addNewFolder && (
        <Modal
          title="폴더 추가"
          input
          button={{ color: "blue", text: "추가하기" }}
        />
      )}

      <Header profileDatas={profileDatas} />
      <AddLink />
      <div className="main-wrapper">
        <SearchBar />
        {folderLists.length ? (
          <>
            <div className="folder-plus-container">
              <div className="folder-wrapper">
                {folderLists ? (
                  folderLists.map((folder: any, i) => {
                    return (
                      <div key={`folder-${i}`} onClick={handleFolderClick}>
                        <Folders
                          className={`listed-folder-name ${
                            currentFolderName === folder.name
                              ? "clicked-folder"
                              : ""
                          }`}
                          folder={folder}
                        />
                      </div>
                    );
                  })
                ) : (
                  <div>folderLists가 없습니다.</div>
                )}
              </div>
              <AddBtn className="folder-add-button">
                <img
                  src={add}
                  alt="plus-button"
                  onClick={() => {
                    setClickedOption({ addNewFolder: true });
                  }}
                />
              </AddBtn>
            </div>
            <div className="current-folder-option-wrapper">
              <div className="current-folder-name">{currentFolderName}</div>
              {currentFolderName === "전체" ? "" : <FolderOptions />}
            </div>
            {!links.length ? (
              <Nolinks msg={"이 폴더에 아직 저장된 링크가 없습니다"} />
            ) : (
              <CardWrapper links={links} />
            )}
          </>
        ) : (
          <Nolinks msg={"저장된 링크가 없습니다."} />
        )}
      </div>

      <Footer />
    </>
  );
}

export default FolderPage;
