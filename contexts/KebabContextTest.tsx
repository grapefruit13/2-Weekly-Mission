import { Dispatch, SetStateAction, createContext, useState } from 'react';

interface KebabContextTestProps {
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

const KebabContextTest = createContext<KebabContextTestProps | undefined>(
  undefined,
);

export function KebabContextTestProvider({ children }: any) {
  const [clickedKebabOption, setClickedKebabOption] = useState({
    delete: false,
    addToFolder: false,
  });

  const closeKebab = () => {
    setClickedKebabOption({ delete: false, addToFolder: false });
  };

  return (
    <KebabContextTest.Provider
      value={{
        clickedKebabOption,
        setClickedKebabOption,
        closeKebab,
      }}
    >
      {children}
    </KebabContextTest.Provider>
  );
}

export default KebabContextTest;
