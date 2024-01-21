import { createContext, useState } from 'react';

const FolderContext = createContext();

export function FolderContextProvider({ children }) {
  const [folderList, setFolderList] = useState([]);
  const [clickedOption, setClickedOption] = useState({});
  const [addedLink, setAddedLink] = useState('');
  const [keyword, setKeyword] = useState('');
  const [filteredLinks, setFilteredLinks] = useState([]);
  const [isSearchResultShowed, setIsSearchResultShowed] = useState(false);

  return (
    <FolderContext.Provider
      value={{
        clickedOption,
        setClickedOption,
        addedLink,
        setAddedLink,
        folderList,
        setFolderList,
        keyword,
        setKeyword,
        filteredLinks,
        setFilteredLinks,
        isSearchResultShowed,
        setIsSearchResultShowed,
      }}
    >
      {children}
    </FolderContext.Provider>
  );
}

export default FolderContext;
