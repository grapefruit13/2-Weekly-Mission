import { CardContextProvider } from "../../contexts/CardContext";
import Card from "./Card";

interface Props {
  links: {
    id: string;
    createdAt: string;
    url: string;
    title: string;
    imageSource: string;
    description: string;
  }[];
}

export function CardWrapper({ links }: Props) {
  return (
    <div className="card-wrapper">
      {links.map((link) => {
        return (
          <div key={link.id}>
            <CardContextProvider>
              <Card link={link} />
            </CardContextProvider>
          </div>
        );
      })}
    </div>
  );
}

export default CardWrapper;
