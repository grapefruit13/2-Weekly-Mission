import LoginButton from "./LoginButton";
import Logo from "./Logo";
import "../../assets/styles/header/Header.css";
export function Header({ profileDatas }) {
  const {
    name = "defaultName",
    image_source = "https://images.unsplash.com/photo-1701600713610-0f724c65168d?q=80&w=1074&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    email = "default@email.com",
  } = profileDatas;
  return (
    <div className="header">
      <nav>
        <Logo />
        {name ? (
          <div className="header-profile">
            <img
              className="header-profile_profile-img"
              src={image_source}
              alt={name}
            />
            <p className="header-profile_profile-name">{email}</p>
          </div>
        ) : (
          <LoginButton />
        )}
      </nav>
    </div>
  );
}

export default Header;
