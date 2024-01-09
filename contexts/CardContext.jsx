import { createContext, useState } from "react";

const CardContext = createContext();

export function CardContextProvider({ children }) {
  const [linkInfo, setLinkInfo] = useState({
    id: "",
    createdAt: "",
    url: "",
    title: "",
    description: "",
    imageSource: "",
  });

  return (
    <CardContext.Provider value={{ linkInfo, setLinkInfo }}>
      {children}
    </CardContext.Provider>
  );
}

export default CardContext;
