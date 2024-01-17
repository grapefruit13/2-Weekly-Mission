import { Dispatch, SetStateAction, createContext, useState } from 'react';

interface KebabContextProps {
  clickedKebabOption: {
    delete: boolean;
    addToFolder: boolean;
  };
  setClickedKebabOption: Dispatch<
    SetStateAction<{
      delete: boolean;
      addToFolder: boolean;
    }>
  >;
  closeKebab: () => void;
}

const KebabContext = createContext<KebabContextProps | undefined>(undefined);

export function KebabContextProvider({ children }: any) {
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
