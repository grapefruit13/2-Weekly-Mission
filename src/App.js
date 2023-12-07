import { BrowserRouter, Routes, Route } from "react-router-dom";
import { lazy } from "react";

const SharedPage = lazy(() => import("./pages/SharedPage"));
const FolderPage = lazy(() => import("./pages/FolderPage"));
const ErrorPage = lazy(() => import("./pages/ErrorPage"));

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<SharedPage />} />
        <Route path="folder" element={<FolderPage />} />
        <Route path="*" element={<ErrorPage />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
