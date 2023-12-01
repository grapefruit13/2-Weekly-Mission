import { useEffect, useState } from "react";
import Card from "./Card";
import SearchBar from "./SearchBar";
import "./Main.css";
export function Main() {
  const [folderDatas, setFolderDatas] = useState({});
  const [ownerDatas, setOwnerDatas] = useState({});
  const [links, setLinks] = useState([]);
  const getLinks = async () => {
    try {
      const response = await fetch(
        "https://bootcamp-api.codeit.kr/api/sample/folder"
      );
      const result = await response.json();
      const linksData = result.folder.links;
      const foldersData = result.folder;
      const ownerData = result.folder.owner;
      setFolderDatas(foldersData);
      setLinks(linksData);
      setOwnerDatas(ownerData);
    } catch (e) {
      console.log(`getLinks에서 ${e} 오류`);
    }
  };
  useEffect(() => {
    getLinks();
  }, []);

  return (
    <>
      <div class="main-header">
        <div class="main-hearder_profile">
          <img
            className="main-header_profile_img"
            src={ownerDatas.profileImageSource}
            alt="profile_img"
          />
          <div className="main-header_profile_name">@{ownerDatas.name}</div>
        </div>
        <span className="main-header_folder-name">{folderDatas.name}</span>
      </div>
      <div className="main-wrapper">
        <SearchBar />
        <div className="card-wrapper">
          {links.map((link) => {
            return (
              <>
                <Card key={link.id} link={link} />
              </>
            );
          })}
        </div>
      </div>
    </>
  );
}

export default Main;
