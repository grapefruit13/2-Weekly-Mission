import logo from "../../assets/icons/header/logo.png";
export function Logo() {
  return (
    <>
      <div className="logo">
        <a href="/">
          <img src={logo} />
        </a>
      </div>
    </>
  );
}

export default Logo;
