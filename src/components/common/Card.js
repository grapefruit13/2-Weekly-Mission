import { useEffect, useState } from "react";
import { calCreatedAt, calCreatedDates } from "../../utils/date";
import "../../assets/styles/card/Card.css";
import "../../assets/styles/card/CardWrapper.css";
import NoImg from "../../assets/icons/card/card_no-img.svg";
import kebab from "../../assets/icons/card/kebab.svg";
import CardInfo from "./CardInfo";

export function Card({ link }) {
  const { id, createdAt, url, title, description, imageSource } = link;
  const [mins, setMins] = useState("");
  const [createdDates, setCreatedDates] = useState({});
  const [isHovered, setIsHovered] = useState(false);

  function getCreatedDates() {
    const { year, month, day } = calCreatedDates(createdAt);
    setCreatedDates((prev) => ({
      ...prev,
      year: year,
      month: month,
      day: day,
    }));
  }

  function getCreatedAt() {
    setMins(calCreatedAt(createdDates));
  }

  function onMouseEnterHandler() {
    setIsHovered(true);
  }
  function onMouseLeaveHandler() {
    setIsHovered(false);
  }
  useEffect(() => {
    getCreatedDates();
  }, [createdAt]);

  useEffect(() => {
    getCreatedAt();
  }, [createdDates]);

  return (
    <>
      <a target="_blank" href={url} rel="noreferrer">
        <div className="flex-wrapper" id={`card-${id}`}>
          <div className="card-img_wrapper">
            {imageSource ? (
              <img
                className={isHovered ? "card-img grow" : "card-img"}
                src={imageSource}
                alt={`${title}-img`}
                onMouseEnter={onMouseEnterHandler}
                onMouseLeave={onMouseLeaveHandler}
              />
            ) : (
              <img className="card-img" src={NoImg} alt={`${title}-img`} />
            )}
          </div>
          <CardInfo
            mins={mins}
            imgSrc={kebab}
            title={title}
            description={description}
            createdDates={createdDates}
          />
        </div>
      </a>
    </>
  );
}

export default Card;
