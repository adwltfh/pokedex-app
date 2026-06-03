import { Routes, Route } from "react-router-dom";
import ListPage from "./pages/ListPage";
import DetailPage from "./pages/DetailPage";

const App = () => {
  return (
    <Routes>
      <Route path="/" element={<ListPage />} />
      <Route path="/pokemon/:name" element={<DetailPage />} />
    </Routes>
  );
};

export default App;
