import { useEffect, useState } from "react";
import "./Card.css";
import NoImg from "../../assets/card_no-img.svg";

export function Card({ link }) {
  const { id, createdAt, url, title, description, imageSource } = link;
  const [mins, setMins] = useState("");
  const [createdDates, setCreatedDates] = useState({});
  const [isHovered, setIsHovered] = useState(false);

  function calCreatedAt() {
    const now = new Date();
    const splited = createdAt.split("T").slice(0, 1);
    const yearMonthDay = splited[0].split("-");

    setCreatedDates((prev) => ({
      ...prev,
      year: yearMonthDay[0],
      month: yearMonthDay[1],
      day: yearMonthDay[2],
    }));

    const createdDate = new Date(
      createdDates.year,
      createdDates.month,
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
    const months = calTime(diffMSec, MONTH) + 1;

    if (months > 23) {
      setMins(`${Math.floor(months / 12)} years ago`);
    } else if (months >= 12) {
      setMins(`1 year ago`);
    } else if (days >= 31) {
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
    calCreatedAt();
  }, []);

  return (
    <>
      <a target="_blank" href={url}>
        <div
          className={isHovered ? "flex-wrapper grow" : "flex-wrapper"}
          id={`card-${id}`}
          onMouseEnter={onMouseEnterHandler}
          onMouseLeave={onMouseLeaveHandler}
        >
          <div className="card-img_wrapper">
            {imageSource ? (
              <img
                className="card-img"
                src={imageSource}
                alt={`${title}-img`}
              />
            ) : (
              <img className="card-img" src={NoImg} alt={`${title}-img`} />
            )}
          </div>
          <div className="info-wrapper">
            <div className="mins">{mins}</div>
            <div className="infos">
              <div className="title">{title}</div>
              <div className="description">{description}</div>
            </div>
            <div className="created">
              {createdDates.year}. {createdDates.month}. {createdDates.day}
            </div>
          </div>
        </div>
      </a>
    </>
  );
}

export default Card;
