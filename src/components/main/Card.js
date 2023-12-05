import { useEffect, useState } from "react";
import "./Card.css";
import NoImg from "../../assets/card_no-img.svg";
import kebab from "../../assets/card/kebab.svg";
import CardInfo from "./CardInfo";

export function Card({ link }) {
  const { id, createdAt, url, title, description, imageSource } = link;
  const [mins, setMins] = useState("");
  const [createdDates, setCreatedDates] = useState({});
  const [isHovered, setIsHovered] = useState(false);

  function calCreatedDates() {
    const splited = createdAt.split("T").slice(0, 1);
    const yearMonthDay = splited[0].split("-");

    setCreatedDates((prev) => ({
      ...prev,
      year: yearMonthDay[0],
      month: yearMonthDay[1],
      day: yearMonthDay[2],
    }));
  }

  function calCreatedAt() {
    const now = new Date();

    const createdDate = new Date(
      createdDates.year,
      Number(createdDates.month) * 1 - 1,
      createdDates.day
    );

    const diffMSec = now.getTime() - createdDate.getTime();
    const MIN = 1000 * 60;
    const HOUR = MIN * 60;
    const DAY = HOUR * 24;
    const MONTH = DAY * 30;

    const calTime = (diffMSec, time) => Math.floor(diffMSec / time);

    const minutes = calTime(diffMSec, MIN);
    const hours = calTime(diffMSec, HOUR);
    const days = calTime(diffMSec, DAY);
    const months = calTime(diffMSec, MONTH);

    if (months > 23) {
      setMins(`${Math.floor(months / 12)} years ago`);
    } else if (months >= 12) {
      setMins(`1 year ago`);
    } else if (days > 30) {
      setMins(`${months} month ago`);
    } else if (days <= 30) {
      setMins(`${days} days ago`);
    } else if (hours >= 24) {
      setMins(`1 day ago`);
    } else if (hours <= 23) {
      setMins(`${hours} hours ago`);
    } else if (minutes >= 60) {
      setMins(`1 hour ago`);
    } else if (minutes <= 59) {
      setMins({ minutes } + "minutes ago");
    } else if (minutes < 2) {
      setMins("1 minute ago");
    }
  }

  function onMouseEnterHandler() {
    setIsHovered(true);
  }
  function onMouseLeaveHandler() {
    setIsHovered(false);
  }
  useEffect(() => {
    calCreatedDates();
  }, [createdAt]);

  useEffect(() => {
    calCreatedAt();
  }, [createdDates]);

  return (
    <>
      <a target="_blank" href={url}>
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
