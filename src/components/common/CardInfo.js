export function CardInfo({ mins, imgSrc, title, description, createdDates }) {
  return (
    <div className="info-wrapper">
      <div className="times-ago-wrapper">
        <div className="mins">{mins}</div>
        <img className="kebab" src={imgSrc} />
      </div>
      <div className="infos">
        <div className="title">{title}</div>
        <div className="description">{description}</div>
      </div>
      <div className="created">
        {createdDates.year}. {createdDates.month}. {createdDates.day}
      </div>
    </div>
  );
}

export default CardInfo;
