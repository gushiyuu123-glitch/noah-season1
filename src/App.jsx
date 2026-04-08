import { Routes, Route } from "react-router-dom";
import NoahGlobalNav from "./components/noah/NoahGlobalNav";
import NoahHome from "./pages/noah/NoahHome";
import Chapter1 from "./pages/noah/Chapter1";
import Chapter2 from "./pages/noah/Chapter2";
import Chapter3 from "./pages/noah/Chapter3";
import Chapter4 from "./pages/noah/Chapter4";
import Chapter5 from "./pages/noah/Chapter5";
import Chapter6 from "./pages/noah/Chapter6";
import Epilogue from "./pages/noah/Epilogue";

export default function App() {
  return (
    <>
      <NoahGlobalNav />

      <Routes>
        <Route path="/" element={<NoahHome />} />
        <Route path="/chapter1" element={<Chapter1 />} />
        <Route path="/chapter2" element={<Chapter2 />} />
        <Route path="/chapter3" element={<Chapter3 />} />
        <Route path="/chapter4" element={<Chapter4 />} />
        <Route path="/chapter5" element={<Chapter5 />} />
        <Route path="/chapter6" element={<Chapter6 />} />
        <Route path="/epilogue" element={<Epilogue />} />
      </Routes>
    </>
  );
}