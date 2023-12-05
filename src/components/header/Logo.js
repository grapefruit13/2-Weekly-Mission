import logo from "../../assets/logo.png";
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
