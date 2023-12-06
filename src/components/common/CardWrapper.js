import Card from "./Card";

export function CardWrapper({ links }) {
  console.log("links", links);
  return (
    <div className="card-wrapper">
      {links.map((link) => {
        return (
          <div key={link.id}>
            <Card link={link} />
          </div>
        );
      })}
    </div>
  );
}

export default CardWrapper;
