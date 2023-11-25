import { useEffect, useState } from "react";
import "./Header.css";
import logo from "../assets/logo.png";
import avatar from "../assets/Avatar.png";

export function Header() {
  const [profileDatas, setProfileDatas] = useState({
    id: 0,
    name: "",
    email: "",
    profileImageSource: "",
  });

  const getProfileData = async () => {
    try {
      const response = await fetch(
        "https://bootcamp-api.codeit.kr/api/sample/user"
      );
      const result = await response.json();
      // console.log(result);
      const { id, name, email, profileImageSource } = result;
      // console.log(id, name, email, profileImageSource);
      setProfileDatas((prevProfileDatas) => ({
        ...prevProfileDatas,
        id: id,
        name: name,
        email: email,
        profileImageSource: profileImageSource,
      }));
    } catch (e) {
      console.log(e);
    }
  };

  useEffect(() => {
    getProfileData();
  }, []);
  return (
    <div className="header">
      <nav>
        <div class="logo">
          <a href="/">
            <img src={logo} />
          </a>
        </div>
        {profileDatas.name ? (
          <div className="header-profile">
            <img
              className="header-profile_profile-img"
              src={profileDatas.profileImageSource}
            />
            <p className="header-profile_profile-name">{profileDatas.email}</p>
          </div>
        ) : (
          <a href="signin.html">
            <button class="login-button button">로그인</button>
          </a>
        )}
      </nav>
    </div>
  );
}

export default Header;
