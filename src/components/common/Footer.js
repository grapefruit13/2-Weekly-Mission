import "../../assets/styles/footer/Footer.css";
import Sns from "./Sns.js";
import FooterSnsDatas from "./FooterSnsDatas.jsx";
export function Footer() {
  const getThisYear = () => {
    const date = new Date();
    const thisYear = date.getFullYear();
    return thisYear;
  };

  return (
    <>
      <div className="footer-wrapper">
        <span className="codeit">©codeit - {getThisYear()}</span>
        <div className="footer-privacy">
          <span className="privacy">
            <a href="/privacy">Privacy Policy</a>
          </span>
          <span className="faq">
            <a href="/faq">FAQ</a>
          </span>
        </div>
        <div className="footer-sns">
          {FooterSnsDatas.map((data) => {
            return (
              <div key={`sns-${data.id}`}>
                <Sns footerSnsData={data} />
              </div>
            );
          })}
        </div>
      </div>
    </>
  );
}

export default Footer;
