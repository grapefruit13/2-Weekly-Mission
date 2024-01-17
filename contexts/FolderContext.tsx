import { Dispatch, SetStateAction, createContext, useState } from 'react';

interface FolderContextProps {
  clickedOption: {
    addFolderLink: boolean;
    shareFolder: boolean;
    editFolderName: boolean;
    deleteFolder: boolean;
    addNewFolder: boolean;
  };
  setClickedOption: Dispatch<
    SetStateAction<{
      addFolderLink: boolean;
      shareFolder: boolean;
      editFolderName: boolean;
      deleteFolder: boolean;
      addNewFolder: boolean;
    }>
  >;
  addedLink: string;
  setAddedLink: Dispatch<SetStateAction<string>>;
  folderList: {}[];
  setFolderList: Dispatch<SetStateAction<{}[]>>;
  keyword: string;
  setKeyword: Dispatch<SetStateAction<string>>;
  filteredLinks: {}[];
  setFilteredLinks: Dispatch<SetStateAction<{}[]>>;
  isSearchResultShowed: boolean;
  setIsSearchResultShowed: Dispatch<SetStateAction<boolean>>;
}

const FolderContext = createContext<FolderContextProps | undefined>(undefined);

export function FolderContextProvider({ children }: any) {
  const [folderList, setFolderList] = useState<{}[]>([]);
  const [clickedOption, setClickedOption] = useState({
    addFolderLink: false,
    shareFolder: false,
    editFolderName: false,
    deleteFolder: false,
    addNewFolder: false,
  });
  const [addedLink, setAddedLink] = useState('');
  const [keyword, setKeyword] = useState('');
  const [filteredLinks, setFilteredLinks] = useState<{}[]>([]);
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
