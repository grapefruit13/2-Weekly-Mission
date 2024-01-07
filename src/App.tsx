import { BrowserRouter, Routes, Route } from "react-router-dom";
import { lazy } from "react";
import { FolderContextProvider } from "../src/contexts/FolderContext";

const SharedPage = lazy(() => import("./pages/SharedPage"));
const FolderPage = lazy(() => import("./pages/FolderPage"));
const ErrorPage = lazy(() => import("./pages/ErrorPage"));

function App() {
  return (
    <FolderContextProvider>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<SharedPage />} />
          <Route path="folder" element={<FolderPage />} />
          <Route path="*" element={<ErrorPage />} />
        </Routes>
      </BrowserRouter>
    </FolderContextProvider>
  );
}

export default App;
