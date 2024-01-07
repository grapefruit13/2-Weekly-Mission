import { useContext, useEffect, useState } from "react";
import { calCreatedAt, calCreatedDates } from "../../utils/date";
import { KebabContextProvider } from "../../contexts/KebabContext";
import CardContext from "../../contexts/CardContext";
import NoImg from "../../assets/icons/card/card_no-img.svg";
import kebab from "../../assets/icons/card/kebab.svg";
import CardInfo from "./CardInfo";
import "../../assets/styles/card/Card.css";
import "../../assets/styles/card/CardWrapper.css";

interface Props {
  id: string;
  createdAt: string;
  url: string;
  title: string;
  description: string;
  imageSource: string;
}

export function Card({ link }: { link: Props }) {
  const { setLinkInfo } = useContext(CardContext);
  const { id, createdAt, url, title, description, imageSource } = link;
  const [mins, setMins] = useState("");
  const [createdDates, setCreatedDates] = useState({
    year: "",
    month: "",
    day: "",
  });
  const [isHovered, setIsHovered] = useState(false);

  const handleSetLinkInfo = () => {
    setLinkInfo({
      id: id,
      createdAt: createdAt,
      url: url,
      title: title,
      description: description,
      imageSource: imageSource,
    });
  };

  const getCreatedDates = () => {
    const [year, month, day] = calCreatedDates(createdAt);
    setCreatedDates((prev) => ({
      ...prev,
      year: year,
      month: month,
      day: day,
    }));
  };

  const getCreatedAt = () => {
    setMins(calCreatedAt(createdDates));
  };

  useEffect(() => {
    handleSetLinkInfo();
  }, []);

  useEffect(() => {
    getCreatedDates();
  }, [createdAt]);

  useEffect(() => {
    getCreatedAt();
  }, [createdDates]);

  return (
    <>
      <KebabContextProvider>
        <div className="flex-wrapper" id={`card-${id}`}>
          <div className="card-img_wrapper">
            <a target="_blank" href={url} rel="noreferrer">
              {imageSource ? (
                <img
                  className={isHovered ? "card-img grow" : "card-img"}
                  src={imageSource}
                  alt={`${title}-img`}
                  onMouseEnter={() => {
                    setIsHovered(true);
                  }}
                  onMouseLeave={() => {
                    setIsHovered(false);
                  }}
                />
              ) : (
                <img className="card-img" src={NoImg} alt={`${title}-img`} />
              )}
            </a>
          </div>
          <CardInfo
            mins={mins}
            imgSrc={kebab}
            title={title}
            description={description}
            createdDates={createdDates}
          />
        </div>
      </KebabContextProvider>
    </>
  );
}

export default Card;
