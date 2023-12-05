import LoginButton from "./LoginButton";
import Logo from "./Logo";
import "./Header.css";
export function Header({ profileDatas }) {
  return (
    <div className="header">
      <nav>
        <Logo />
        {profileDatas.name ? (
          <div className="header-profile">
            <img
              className="header-profile_profile-img"
              src={profileDatas.profileImageSource || profileDatas.image_source}
              alt={profileDatas.name}
            />
            <p className="header-profile_profile-name">{profileDatas.email}</p>
          </div>
        ) : (
          <LoginButton />
        )}
      </nav>
    </div>
  );
}

export default Header;
