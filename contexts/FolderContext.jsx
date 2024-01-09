import { createContext, useState } from "react";

const FolderContext = createContext();

export function FolderContextProvider({ children }) {
  const [clickedOption, setClickedOption] = useState({
    addFolderLink: false,
    shareFolder: false,
    editFolderName: false,
    deleteFolder: false,
    addNewFolder: false,
  });
  const [addedLink, setAddedLink] = useState("");

  return (
    <FolderContext.Provider
      value={{
        clickedOption,
        setClickedOption,
        setAddedLink,
        addedLink,
      }}
    >
      {children}
    </FolderContext.Provider>
  );
}

export default FolderContext;
