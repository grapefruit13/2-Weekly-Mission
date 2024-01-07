import logo from "../../assets/icons/header/logo.png";

export function Logo() {
  return (
    <>
      <div className="logo">
        <a href="/">
          <img src={logo} alt="logo" />
        </a>
      </div>
    </>
  );
}

export default Logo;
