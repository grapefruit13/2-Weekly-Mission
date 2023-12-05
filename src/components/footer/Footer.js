import "./Footer.css";
import Sns from "./Sns.js";
import facebook from "../../assets/footer/facebook.png";
import twitter from "../../assets/footer/twitter.png";
import instagram from "../../assets/footer/instagram.png";
import youtube from "../../assets/footer/youtube.png";

export function Footer() {
  const getThisYear = () => {
    const date = new Date();
    const thisYear = date.getFullYear();
    return thisYear;
  };
  const footerSnsDatas = [
    { id: 1, name: "facebook", url: "https://www.facebook.com", img: facebook },
    { id: 2, name: "twitter", url: "https://www.twitter.com", img: twitter },
    {
      id: 3,
      name: "youtube",
      url: "https://www.youtube.com",
      img: youtube,
    },
    {
      id: 4,
      name: "instagram",
      url: "https://www.instagram.com",
      img: instagram,
    },
  ];

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
          {footerSnsDatas.map((data) => {
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
