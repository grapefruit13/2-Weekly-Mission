interface OwnerDataProps {
  id: string;
  name: string;
  profileImageSource: string;
}

interface FolderProps {
  id: string;
  name: string;
  owner: object;
  links?: {}[];
}

function MainHeader({
  ownerDatas,
  folderDatas,
}: {
  ownerDatas: OwnerDataProps;
  folderDatas: FolderProps;
}) {
  return (
    <>
      <div className="main-header">
        <div className="main-hearder_profile">
          <img
            className="main-header_profile_img"
            src={ownerDatas.profileImageSource}
            alt="profile_img"
          />
          <div className="main-header_profile_name">@{ownerDatas.name}</div>
        </div>
        <span className="main-header_folder-name">{folderDatas.name}</span>
      </div>
    </>
  );
}

export default MainHeader;
