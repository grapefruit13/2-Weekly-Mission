import { useEffect, useState } from "react";
import { getData } from "../api/api";
import { Footer } from "../footer/Footer.js";
import AddLink from "../header/AddLink.js";
import Header from "../header/Header.js";
import Folders from "../main/Folders.js";
import SearchBar from "../main/SearchBar.js";
import CardWrapper from "../main/CardWrapper.js";
import FolderOptions from "../main/FolderOptions.js";
import Nolinks from "../error/NoLinks.js";
import add from "../../assets/add.svg";
import "../main/Main.css";
import "../main/Responsive.css";

function FolderPage() {
  const [profileDatas, setProfileDatas] = useState({
    id: 0,
    created_at: "",
    name: "",
    image_source: "",
    email: "",
    auth_id: "",
  });

  const [links, setLinks] = useState([]);
  const [folderLists, setFolderLists] = useState([]);
  const [currentFolderId, setCurrentFolderId] = useState("");
  const [currentFolderName, setCurrentFolderName] = useState("전체");

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
      console.log(e);
    }
  };

  const getTotalLinksData = async () => {
    try {
      const result = await getData("users/1/links");
      const { data } = result;
      const datas = data.map((link) => ({
        ...link,
        createdAt: link.created_at,
        imageSource: link.image_source,
      }));
      setLinks(datas);
    } catch (e) {
      console.log(`Folderpage의 getLinksData에서 ${e} 발생`);
    }
  };

  const getFolderLists = async () => {
    try {
      const result = await getData("users/1/folders");
      const { data } = result;
      console.log(data);
      data.unshift({ name: "전체" });
      setFolderLists(data);
    } catch (e) {
      console.log(`Folderpage의 getFolderLists에서 ${e} 발생`);
    }
  };

  const getFolder = async () => {
    try {
      const result = await getData(`users/1/links?folderId=${currentFolderId}`);
      const { data } = result;
      const datas = data.map((link) => ({
        ...link,
        createdAt: link.created_at,
        imageSource: link.image_source,
      }));
      setLinks(datas);
    } catch (e) {
      console.log(`Folderpage의 handleFolderClick의 getFolder에서 ${e} 발생`);
    }
  };
  const handleFolderClick = (e) => {
    setCurrentFolderName(e.target.textContent);
    if (e.target.textContent === "전체") {
      getTotalLinksData();

      return;
    }
    const clikedFolder = folderLists.filter(
      (folder) => folder.name === e.target.textContent
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
      <Header profileDatas={profileDatas} />
      <AddLink />
      <div className="main-wrapper">
        <SearchBar />
        {folderLists.length ? (
          <>
            <div className="folder-plus-container">
              <div className="folder-wrapper">
                {folderLists ? (
                  folderLists.map((folder, i) => {
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
              <div className="folder-add-button">
                <img src={add} alt="plus-button" />
              </div>
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
