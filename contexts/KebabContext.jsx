import { createContext, useState } from 'react';

const KebabContext = createContext();

export function KebabContextProvider({ children }) {
  const [clickedKebabOption, setClickedKebabOption] = useState({
    delete: false,
    addToFolder: false,
  });

  const closeKebab = () => {
    setClickedKebabOption({ delete: false, addToFolder: false });
  };

  return (
    <KebabContext.Provider
      value={{
        clickedKebabOption,
        setClickedKebabOption,
        closeKebab,
      }}
    >
      {children}
    </KebabContext.Provider>
  );
}

export default KebabContext;
