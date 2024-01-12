import { createContext, useState } from 'react';

const FolderContext = createContext();

export function FolderContextProvider({ children }) {
  const [folderList, setFolderList] = useState([]);
  const [clickedOption, setClickedOption] = useState({
    addFolderLink: false,
    shareFolder: false,
    editFolderName: false,
    deleteFolder: false,
    addNewFolder: false,
  });
  const [addedLink, setAddedLink] = useState('');
  const [keyword, setKeyword] = useState('');
  const [filteredLinks, setFilteredLinks] = useState([]);

  return (
    <FolderContext.Provider
      value={{
        clickedOption,
        setClickedOption,
        setAddedLink,
        addedLink,
        folderList,
        setFolderList,
        keyword,
        setKeyword,
        filteredLinks,
        setFilteredLinks,
      }}
    >
      {children}
    </FolderContext.Provider>
  );
}

export default FolderContext;
